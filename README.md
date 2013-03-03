# grunt-ender

> Manages you Ender build.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-ender --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-ender');
```

## The "ender" task

### Overview
This is a temporary utility for handling Ender builds without having to always type `--use` or `--output`. Note that there is an official solution for this problem [discussed on github](https://github.com/ender-js/Ender/issues/131) that should be available soon. In the meantime, you can use this grunt task to help make using Ender easier.

Usage is simple:

In your `package.json` file, add an `ender` key and a `grunt` key under that

```js
"ender": {
  "grunt": {

  }
}
```

Under the `grunt` key, add an `output` param with a path to where you want the Ender file to go

```js
"ender": {
  "grunt": {
    "output": "public/scripts/vendor/ender"
  }
}
```

The example above would save the Ender build to "public/scripts/vendor/ender.js".

3. Lastly, add the list of dependencies

```js
"ender": {
  "grunt": {
    "output": "public/scripts/vendor/ender",
    "dependencies": ["bean", "bonzo", "qwery"]
  }
}
```

After this, you can run `grunt ender` to build (or rebuild) your library. Use `grunt ender --info` to see which libraries are currently in use.

#### Other notes

- It's expected that you include all of the Ender dependencies in the standard `dependencies` key of the package.json file as well. This way the grunt task doesn't have to deal with installing anything (assuming you run `npm install` as usual) and you can specify the versions you need.
- To reiterate from above, this is a temporary hold-over until the official solution from Ender is in place. There are no guarantees about updates or bug fixes to this plugin once that is released.
- When you run `grunt ender` or `grunt ender:build` it will actually rebuild the library from scratch. The regular Ender `add` and `remove` commands are not utilized directly. This means that to add and remove libraries from the Ender build, edit your package.json file as appropriate.
- To figure out which file contains the configuration data, this will try to look for a `pkg` or `package` variable in the grunt config object. This way we can avoid reading the file if you have already done it anyway. If not present, it will assume and read from `package.json`. However, you can specify the explicit location of the configuration file by adding `config: "path/to/config.json"` in the `options` key of the `ender` task in your Gruntfile as well.

### Usage Examples

#### Example `package.json` file (relevant portion only)

    "dependencies": {
      "bean": "0.1.0",
      "bonzo": "*",
      "qwery": "*"
    },
    "ender": {
      "grunt": {
        "output": "public/scripts/vendor/ender",
        "dependencies": ["bean", "bonzo", "qwery"]
      }
    }

#### Building the Ender library

`grunt ender` or `grunt ender:build`

#### Information about the current build
`grunt ender --info` or `grunt ender:info`

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.1 - npm noobie mistakes
0.1.0 - first version
