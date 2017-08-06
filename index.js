$(document).ready(function() {
    
    $('.toggleBtns').hover(function () {
        $(this).toggleClass('hover');
    });
    
    $('.toggleBtns').click(function () {
        $(this).toggleClass('active');
        var panelId = $(this).attr("id") + "Panel";
        $('#' + panelId).toggleClass('hidden');
        $('.panel').width(($(window).width() / (4 - $('.hidden').length)) - 2);
    });
    
    $('.panel').height($(window).height() - $('.nav').height() - 13);
    $('.lineCount').height($(window).height() - $('.nav').height() - 15);
    $('.panel').width(($(window).width() / 2) - 2);
    $('textarea').blur();
    
    var lastNumHtml = 1, lastNumCss = 1, lastNumJs = 1;
    $('#htmlPanel_').keypress(function (e) {
        if (e.which == 13) {
            lastNumHtml++;
            $('.lineCountHtml').append(lastNumHtml, "<br />");
        }
    });
    
    $('#cssPanel_').keypress(function (e) {
        if (e.which == 13) {
            lastNumCss++;
            $('.lineCountCss').append(lastNumCss, "<br />");
        }
    });
    
    $('#jsPanel_').keypress(function (e) {
        if (e.which == 13) {
            lastNumJs++;
            $('.lineCountJs').append(lastNumJs, "<br />");
        }
    });
    
    function updateOutput() {
        $('#outputPanel').contents().find('html').html("<html><head><style type='text/css'>" + $('#cssPanel_').val() + "</style></head><body>" + $('#htmlPanel_').val() + "</body></html>");
        
        document.getElementById('outputPanel').contentWindow.eval($('#jsPanel_').val());
    }
    
    $('.switch').click(function() {
        var auto = false;
        
        if($('input[name="chk[]"]:checked').length > 0) {
            $('.manualRun').css("display", "none");
            $('.autoRun').css("display", "block");
            auto = true;
        } else {
            $('.manualRun').css("display", "block");
            $('.autoRun').css("display", "none");
            auto = false;
        }
        
        if(auto == true) {
            updateOutput();

            $('textarea').on("change keyup paste", function() {
                updateOutput();        
            });   
        }
    });
    
    $('.manualRun').hover(
        function() {
            $('.manualRun').addClass('hoverRun');
        }, 
        function() {
            $('.manualRun').removeClass('hoverRun');
        }
    );
    
    $('.manualRun').click(function () {
        updateOutput()
    });
    
});