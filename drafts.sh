#!/usr/bin/env bash

grep "^\- status: draft" content/post/*/*.md -b --color
