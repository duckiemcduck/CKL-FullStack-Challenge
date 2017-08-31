#! /bin/sh
if test -d node_modules;
then
	echo "node_modules exists, skipping yarn install" ;
	echo "delete node_modules for new modules in package or bin linking" ;
else
	if [ $WIN_HOST -eq 1 ];
	then
		echo "Windows Host set, disabling bin links (WIN_HOST=1)"
		yarn install --no-bin-links
	else
		yarn install
	fi
fi
if [ $DEV -eq 1 ];
then
	if [ $WIN_HOST -eq 1 ];
	then
		echo "Windows Host set (WIN_HOST=1), disabling bin links"
		yarn build:windev
	else
		yarn build
	fi
else
	if [ $WIN_HOST -eq 1 ];
	then
		echo "Windows Host set, disabling bin links (WIN_HOST=1)"
		yarn build:winprod
	else
		yarn build:prod
	fi
fi
