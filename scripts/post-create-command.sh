#!/bin/bash

set -eu

echo y | yarn

~/elam/elam.sh repo status
