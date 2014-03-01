
$(function(){
    var themes = [
        ["Default",   "//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css"],
        ["Amelia",    "//bootswatch.com/amelia/bootstrap.min.css"],
        ["Cerulean",  "//bootswatch.com/cerulean/bootstrap.min.css"],
        ["Cosmo",     "//bootswatch.com/cosmo/bootstrap.min.css"],
        ["Cupid",     "//bootswatch.com/cupid/bootstrap.min.css"],
        ["Cyborg",    "//bootswatch.com/cyborg/bootstrap.min.css"],
        ["Flatly",    "//bootswatch.com/flatly/bootstrap.min.css"],
        ["Journal",   "//bootswatch.com/journal/bootstrap.min.css"],
        ["Lumen",     "//bootswatch.com/lumen/bootstrap.min.css"],
        ["Readable",  "//bootswatch.com/readable/bootstrap.min.css"],
        ["Shamrock",  "//bootswatch.com/shamrock/bootstrap.min.css"],
        ["Simplex",   "//bootswatch.com/simplex/bootstrap.min.css"],
        ["Slate",     "//bootswatch.com/slate/bootstrap.min.css"],
        ["Spacelab",  "//bootswatch.com/spacelab/bootstrap.min.css"],
        ["Superhero", "//bootswatch.com/superhero/bootstrap.min.css"],
        ["United",    "//bootswatch.com/united/bootstrap.min.css"],
        ["Yeti",      "//bootswatch.com/yeti/bootstrap.min.css"]
    ];

    var sheet = $('<link href="' + themes[0][1] + '" rel="stylesheet" />'),
        list  = $('#theme-list');
    sheet.prependTo('head');
    
    if (!list.length)
        return;
    
    var i, n = themes.length, name, href;
    for (i = 0; i < n; i++) {
        name = themes[i][0];
        href = themes[i][1];
        $('<li><a href="#" data-href="' + href + '">' + name + '</a></li>')
            .appendTo(list).find('a').click(function() {
                sheet.attr('href', $(this).attr('data-href'));
            });
    }
});

$(document).ready(generateButtons);

var element_;

function generateButtons() {
    var i = 0, sheet, sheets = document.styleSheets;
    while ((sheet = sheets[i++]) && ('showcase' !== sheet.href.split('?').pop())); // !
    if (!sheet)
        return;

    var rules = sheet.cssRules, n = rules.length, j = -1, 
        re = /\.([\w-]+)(:hover)/, selector, prevSelector,
        container = $('#showcase'),
        header    = $('<h3 class="sub-header"></h3>'),
        element   = $(element_ || '<button type="button" class="btn btn-lg"></button>'),
        groupClass = [
            "btn-info",
            "btn-success",
            "btn-danger",
            "btn-warning",
            "btn-primary",
            "btn-default"
        ];
        
    for (i = 0; i < n; i++) {
        if (rules[i].type !== 1 
            || !(selector = re.exec(rules[i].selectorText))
            || (prevSelector === (selector = selector[1])))
                continue;
        prevSelector = selector;
        if (!selector.search("md-group")) {
            header.clone().appendTo(container)
                .text(rules[i].style.getPropertyValue('content').replace(/['"]/g, ''));
            j = (j + 1) % groupClass.length;
        } else {
            element.clone().appendTo(container)
                .addClass(groupClass[j]).addClass(selector).text(selector);
        }
    }
}
