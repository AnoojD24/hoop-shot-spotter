from pathlib import Path
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import io
import torch
from PIL import Image
import torchvision.transforms as T
import torchvision.models as models
import hashlib

CLASSES = ["Layup", "Jump Shot", "Dunk"]


def load_real_model(model_path: Path):
    model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)
    model.fc = torch.nn.Linear(model.fc.in_features, len(CLASSES))
    state = torch.load(model_path, map_location="cpu")
    model.load_state_dict(state)
    model.eval()

    transform = T.Compose([
        T.Resize((224, 224)),
        T.ToTensor(),
        T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])

    def predict(image: Image.Image):
        tensor = transform(image).unsqueeze(0)
        with torch.no_grad():
            probs = torch.softmax(model(tensor), dim=1)[0]
        return probs

    return predict


class MockModel:
    def __call__(self, image: Image.Image):
        # Deterministic pseudo-random probabilities based on image content
        data = image.tobytes()
        h = int(hashlib.md5(data).hexdigest(), 16)
        rng = torch.Generator().manual_seed(h % (2**31))
        probs = torch.rand(len(CLASSES), generator=rng)
        probs = probs / probs.sum()
        return probs


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = Path(__file__).parent / "models" / "model.pt"

if MODEL_PATH.exists():
    predictor = load_real_model(MODEL_PATH)
else:
    predictor = MockModel()


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    probs = predictor(image)
    predictions: List[dict] = []
    for cls, prob in zip(CLASSES, probs):
        predictions.append({"shotType": cls, "confidence": float(prob.item() * 100)})
    # sort high to low
    predictions.sort(key=lambda x: x["confidence"], reverse=True)
    return {"predictions": predictions}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
