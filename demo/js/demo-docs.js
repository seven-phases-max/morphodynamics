$(document).ready(main);

function main() {
    //var styles = $('style');
    //console.log(styles.contents());
    var rules = document.styleSheets
             && document.styleSheets[2]
             && document.styleSheets[2].cssRules;
    
    if (!rules)
        return;

    var i, j = -1, n = rules.length, re = /\.([\w-]+)(:hover)/, selector, prevSelector,
        container = $('#content'),
        header    = $('<h3 class="sub-header"></h3>'),
        button    = $('<button type="button" class="btn btn-primary btn-lg"></button>'),
        groupClass = [
            "btn-success",
            "btn-warning",
            "btn-danger",
            "btn-info",
            "btn-primary"
        ];
        
    for (i = 0; i < n; i++) {
        if (rules[i].type !== 1 
            || !(selector = re.exec(rules[i].selectorText))
            || (prevSelector === (selector = selector[1])))
                continue;
        prevSelector = selector;
        if (!selector.search("md-group")) {
            header.clone().appendTo(container)
                .text(rules[i].style.getPropertyValue('content').replace(/'/g, ""));
            j = (j + 1) % groupClass.length;
        } else {
            button.clone().appendTo(container)
                .addClass(groupClass[j]).addClass(selector).text(selector);
        }
    }
}