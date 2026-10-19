# jigsaw-docker-starter

A [Jigsaw](https://jigsaw.tighten.com) static site starter template with Vite, Tailwind CSS and hot reload. All you need is a single Docker container, no local PHP or node installation needed.

## What you get

- Jigsaw (PHP static site generator) with the default template
- Vite + Tailwind CSS for assets
- One container running both `jigsaw serve` and the Vite dev server
- Automatic Jigsaw rebuild and browser reload when you save a file in `source/`


## Quick start

```bash
# 1. Clone the repo and cd into it
git clone https://github.com/laba4/jigsaw-docker-starter.git "Your Site"
cd "Your Site"

# 2. Install dependencies (first run only)
docker compose run --rm jigsaw sh -c "composer install && npm install"

# 3. Set APP_URL in .env file (https://jigsaw.tighten.com/docs/local-development/)
echo "APP_URL=http://localhost:8000" > .env

# 4. Start everything
docker compose up --build
```

Then open:

- Site: http://localhost:8000
- Vite dev server: http://localhost:5173 (assets and hot reload, you don't browse here directly)

Edit anything in `source/` and the page rebuilds and reloads on its own.

After pulling new changes that touch `composer.json` or `package.json`, run step 2 again.

The generated site ends up in `build_production/`. Deploy that folder to any static host.

## How it works

- `php vendor/bin/jigsaw serve` only serves the already built files in `build_local/`. It does **not** watch your source files.
- `npm run dev` starts Vite, whose Jigsaw plugin watches `source/`, runs the Jigsaw build when something changes, and tells the browser to reload.

Because Vite has to run PHP to trigger the build, both live in the same container. The image (`.docker/dev/Dockerfile`) is based on the official Composer image (PHP + Composer) with Node and npm added.

## Building for production

```bash
docker compose run --rm jigsaw sh -c "npm run build"
```

## How this starter was created

The project was initialized with a one-time Composer container:

```bash
docker compose run --rm jigsaw sh -c "composer require tightenco/jigsaw && vendor/bin/jigsaw init"
```

You don't need to repeat this when using the starter, since the result is already committed.