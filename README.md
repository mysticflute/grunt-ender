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

Usage is simple. In your Gruntfile, add an `ender` task and under the `options` part you can specify the output location and the list of dependencies.

```js
ender: {
  options: {
    output: "public/scripts/vendor/ender",
    dependencies: ["bean", "bonzo", "qwery"]
  }
}
```

The example above would save the Ender build to "public/scripts/vendor/ender.js".

After this, you can run `grunt ender` to build (or rebuild) your library. Use `grunt ender --info` to see which libraries are currently in use.

#### Other notes

- It's expected that you include all of the Ender dependencies in the standard `dependencies` key of the package.json file as well. This way the grunt task doesn't have to deal with installing anything (assuming you run `npm install` as usual) and you can specify the versions you need there.
- To reiterate from above, this is a temporary hold-over until the official solution from Ender is in place. There are no guarantees about updates or bug fixes to this plugin once that is released.
- When you run `grunt ender` or `grunt ender:build` it will actually rebuild the library from scratch. The regular Ender `add` and `remove` commands are not utilized directly. This means that to add and remove libraries from the Ender build, edit your Gruntfile as appropriate.

### Usage Examples

In your Gruntfile.js

```js
grunt.initConfig({
  ender: {
    options: {
      output: "public/scripts/vendor/ender",
      dependencies: ["bean", "bonzo", "qwery"]
    }
  }
});
```

#### Building the Ender Library

`grunt ender` or `grunt ender:build`

#### Information About the Current Build
`grunt ender --info` or `grunt ender:info`

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

- **0.2.1** - merge pull request for event hook
- **0.2.0** - remove usage of package.json
- **0.1.0** - first version
