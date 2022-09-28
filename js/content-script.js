     function handle(element) {
        alert(element.tagName)
    }
    
    function callgetTagName(event) {
        
        if (event === undefined) event = window.event
        if (event.target instanceof Element)
            handle(event.target)
    }; 

