
$(function(){
    var themes = [
        ["Default",   "//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css"],
        ["Amelia",    "//bootswatch.com/amelia/bootstrap.min.css"],
        ["Cerulean",  "//bootswatch.com/cerulean/bootstrap.min.css"],
        ["Cosmo",     "//bootswatch.com/cosmo/bootstrap.min.css"],
        ["Cyborg",    "//bootswatch.com/cyborg/bootstrap.min.css"],
        ["Darkly",    "//bootswatch.com/darkly/bootstrap.min.css"],
        ["Flatly",    "//bootswatch.com/flatly/bootstrap.min.css"],
        ["Journal",   "//bootswatch.com/journal/bootstrap.min.css"],
        ["Lumen",     "//bootswatch.com/lumen/bootstrap.min.css"],
        ["Readable",  "//bootswatch.com/readable/bootstrap.min.css"],
        ["Sandstone", "//bootswatch.com/sandstone/bootstrap.min.css"],
        ["Simplex",   "//bootswatch.com/simplex/bootstrap.min.css"],
        ["Slate",     "//bootswatch.com/slate/bootstrap.min.css"],
        ["Solar",     "//bootswatch.com/solar/bootstrap.min.css"],
        ["Spacelab",  "//bootswatch.com/spacelab/bootstrap.min.css"],
        ["Superhero", "//bootswatch.com/superhero/bootstrap.min.css"],
        ["United",    "//bootswatch.com/united/bootstrap.min.css"],
        ["Yeti",      "//bootswatch.com/yeti/bootstrap.min.css"],

        ["CT Material Kit", "//cdn.rawgit.com/creativetimofficial/material-kit/v1.1.0/assets/css/material-kit.css", true],
        ["CT Paper Kit",    "//cdn.rawgit.com/creativetimofficial/paper-kit/d10ced7c/assets/css/ct-paper.css", true],
        ["Magister",        "//gettemplate.com/demo/magister/assets/css/magister.css", true]
    ];

    var baseTheme = themes[0][1],
        sheetBase = $('<link href="' + baseTheme + '" rel="stylesheet" />'),
        sheetMain = $('<link href="" rel="stylesheet" />'),
        list      = $('#theme-list');
    sheetMain.prependTo('head');
    sheetBase.prependTo('head');


    if (!list.length)
        return;

    var i, n = themes.length, name;
    for (i = 0; i < n; i++) {
        name = themes[i][0];
        $('<li><a href="#" data-index="' + i + '">' + name + '</a></li>')
            .appendTo(list).find('a').click(select);
    }

    function select() {
        var theme = themes[Number($(this).attr('data-index'))],
            base = '',
            main = theme[1];

        if (theme[2]) {
            // needs base theme (i.e. `bootstrap.css`):
            base = baseTheme;
        }

        sheetBase.attr('href', base);
        sheetMain.attr('href', main);
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
