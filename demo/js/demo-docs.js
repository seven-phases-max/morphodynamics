$(document).ready(main);

function main() {
    //var styles = $('style');
    //console.log(styles.contents());
    var rules = document.styleSheets
             && document.styleSheets[2]
             && document.styleSheets[2].cssRules;
    
    if (!rules)
        return;

    var i, n = rules.length, re = /\.([\w-]+)(:hover)/, selector,
        body   = $('body'),
        button = $('<button type="button" class="btn btn-primary btn-lg"></button>');

    for (i = 0; i < n; i++) {
        if (rules[i].type !== 1 
            || !(selector = re.exec(rules[i].selectorText)))
                continue;
        selector = selector[1];
        console.log(selector);
        button.clone().appendTo(body).addClass(selector).text(selector);
    }
}