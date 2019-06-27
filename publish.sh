#!/bin/bash

npm install
dist_folder=dist
rm -rf $dist_folder
mkdir $dist_folder
mkdir $dist_folder/langs
mkdir $dist_folder/images
mkdir $dist_folder/vendor

cp src/manifest.json $dist_folder
cp src/index.css $dist_folder
cp src/index.js $dist_folder
cp src/images/* $dist_folder/images/
cp node_modules/hello-week/dist/langs/en.json $dist_folder/langs/
cp node_modules/hello-week/dist/css/hello.week.min.css $dist_folder/vendor/
cp node_modules/hello-week/dist/css/hello.week.theme.min.css $dist_folder/vendor/
cp node_modules/jquery/dist/jquery.min.js $dist_folder/vendor/
cp node_modules/hello-week/dist/hello.week.min.js $dist_folder/vendor/

cd $dist_folder
zip -r ../workday-calendar-extension.zip .
