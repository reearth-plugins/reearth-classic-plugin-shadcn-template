# Re:Earth Classic Plugin ShadCN Template

This template provides a minimal setup to develop a Re:Eearth Classic Plugin with Vite + React + ShadCN + Tailwind.

## Re:Earth Classic Plugin stucture

Re:Earth Classic Plugin's stuctrue is basically matching the defineications in `reearth.yml`. In detail:

- One plugin can contain zero to multiple extensions.
- Extension has two types: `widget` and `block`. However, in terms of structure, these two types are essentially consistent when it comes to developing extensions.
- Each extension must correspond to a unique javascript script.
- One extension can render UI to three different places: `main`, `modal`, `popup`.
  - `main` here refers to the main view of the extension, which is usually a widget panel or a block panel.
  - You can prepare multiple UIs for `main`, `modal`, and `popup` if you want. Each UI will be rendered in a sandboxed iframe. Essentially, it is an independent Single Page Application (SPA).

## Structure

- `src/`: Source code of the plugin.
- `public/`: Static files. As a Re:Earth Classic Plugin, the only static file should be `reearth.yml`. Please always provide this yaml file.
- `dist/`: Output directory of the plugin build. Typically it will contain the bundled JavaScript files for each extension and the `reearth.yml` file.
- `dist-ui/`: Output directory of the UI build. This is an intermediate product of developing a plugin. Extension script will using the built ui files in this directory.
- `package/`: Package directory of the plugin. This directory is used to pack the plugin into a zip file.
- `configs/`: Vite configuration files for both extension and ui.
- `scripts/`: Scripts for building and packing the plugin.

## Demo

This template provides a simple demo of a plugin with a widget extension. We can gain a further understanding of the file structure through this demo.

First we define the plugin yaml file `public/reearth.yml`:

```yaml
id: reearth-classic-plugin-shadcn-template
name: Classic plugin shadcn template
version: 1.0.0
extensions:
  - id: demo
    type: widget
    name: Demo
    schema:
      groups:
        - id: appearance
          title: Appearance
          fields:
            - id: primary_color
              title: Primary color
              type: string
              ui: color
```

As you can see it only has one extension `demo` of type `widget`. The extension has a schema with a group `appearance` and a field `primary_color`.

Then we can check the source code of the plugin:

``` js
- src
  - extensions
    - demo // folder of this extenion, naming with extension id. If the plugin has multiple extension, there should be multiple folders besides demo
      - main // the ui project for main view. If the extension has multiple UIs, there should be multiple folders besides this. Each ui folder is a typical SPA project.
      - demo.ts // the extension script.
  - shared // shared components for all ui. Basically shadCN components and utils.
```

## Scripts

Please check the scripts in `package.json`. Here we go through some of them:

``` zsh
yarn dev:demo:main
```

Start the development server for the ui project `main` of the `demo` extension.
Please check the env vars passing in so that you can add your own scripts for different ui projects of different extensions.

``` zsh
yarn build:demo:main
```

Build the ui project `main` of the `demo` extension to `dist-ui/demo/main`.

``` zsh
yarn build:demo
```

Build the extension `demo` extension to `dist`. `reearth.yml` will also be copied to `dist`.

``` zsh
yarn build
```

Build the plugin. (Build all extensions to `dist` generate a zip file to `package` folder).
Please note `README.md` and `LICENSE` will be copied to zip as well.
Please note that you need to add build extenion cmd into this when you have more extensions.

``` zsh
yarn preview
```

Start the preview server at port `5005`.

## Develop with Re:Earth Classic together

### Traditional way

- Start a dev server for the ui project of the extension you are developing.
- Coding for the ui. You can check it with dev server.
- Coding for the extension scripit. There's no way to check the result at this time point.
- Build plugin, and get the plugin zip file.
- Go to Re:Earth Classic, install the plugin by zip file. Add the widget or block.
- Check the result.

This process is very lengthy and results in low development efficiency.

### Improved way

We are going to add a new feature to Re:Earth Classic to improve the DX of plugin. However there're some steps we need to follow:

0. Prepare:
   1. Run Re:Earth Classic locally. Only front-end is required, you can use any backend, for example OSS backend.
   2. Updated plugin code. You can just try with demo.
1. Run `dev-build`.
   1. Run `yarn dev-build:demo:main`. Please also update the scripts referce the current demo one. This will do the following:
      1. Start a dev server for the ui project as normal. (Sometimes you can check it but you'll not use this in most times)
      2. Automatically build ui when edit.
      3. Automatically build extension.
      4. Start a prview server at `5005`.
2. Setup .env vars in Re:Earth Classic front-end project. `REEARTH_WEB_DEV_PLUGIN_URLS='["http://localhost:5005"]'`. Server will automatically restart after .env changed.
4. Done. Now Re:Earth Classic will provide two buttons in editor header.
   1. `Install Dev Plugins`
      1. This will fetch plugin files from plugin preview and automatially zip and install.
      2. When you need to click this? -> Only when the first time you setup this and when you modified the `reearth.yml`.
   2. `Reload Dev Plugin Extensions`
      1. This will reload all the extensions from the plugin preview.
      2. Only plugin reload, much faster than reload the whole page.

As a summary, after all setup done the DX will be:

- Do any changes on plugin code project.
- Click `Reload Dev Plugin Extensions` on local Re:Earth Classic webpage.
