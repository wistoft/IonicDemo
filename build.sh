


if [[ "$OSTYPE" == "msys" ]]; then

    # Windows git-bash
    
	#ionic cordova run android --debug -l -c
	ionic cordova run android --debug -l -c	 | node buildFilter.js
    
elif [[ "$OSTYPE" == "darwin"* ]]; then

    # Mac OSX
	
    #ionic cordova run ios --debug -l -c
	ionic cordova run ios --debug -l -c	 | node buildFilter.js

#elif [[ "$OSTYPE" == "cygwin" ]]; then
    #echo ""
#elif [[ "$OSTYPE" == "linux-gnu" ]]; then
        
#elif [[ "$OSTYPE" == "win32" ]]; then
        # I'm not sure this can happen.
#elif [[ "$OSTYPE" == "freebsd"* ]]; then
        # ...
else
    echo "Unknown os: " + $OSTYPE
fi