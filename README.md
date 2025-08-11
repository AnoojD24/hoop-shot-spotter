# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/94ff44e8-3b89-4aaf-9f61-fff88e086ef0

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/94ff44e8-3b89-4aaf-9f61-fff88e086ef0) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/94ff44e8-3b89-4aaf-9f61-fff88e086ef0) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Backend and Model Training

The project includes a simple FastAPI backend that powers the `/predict` endpoint. Install dependencies and run the server:

```bash
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload
```

If `backend/models/model.pt` exists, the server will load it for inference; otherwise a deterministic mock model is used so the app remains functional without training.

To train a custom model, add images to `backend/data/{layup,jump_shot,dunk}/` and run:

```bash
python backend/train.py --data_dir backend/data --epochs 5 --out backend/models/model.pt
```

This script fine-tunes a ResNet18 head and saves weights to the specified path.
