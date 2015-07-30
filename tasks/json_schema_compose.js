/*
 * grunt-json-schema-compose
 * https://github.com/mmorga/grunt-json-schema-compose
 *
 * Copyright (c) 2015 Mark Morga
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    grunt.registerMultiTask('json_schema_compose', 'grunt plugin for json-schema-compose', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var Schema = require('json-schema-compose').Schema,
            rootSchema,
            options = this.options({schemaPath: 'schema'}),
            schema;

        this.files.forEach(function (f) {
            rootSchema = grunt.file.readJSON(f.src[0]);
            schema = new Schema(rootSchema, require('fs').realpathSync(options.schemaPath)).compose();
            grunt.file.write(f.dest, JSON.stringify(schema, null, '  '));
            grunt.log.ok(this.target + ': ' + f.src[0] + ' -> ' + f.dest);
        }, this);
    });
};
