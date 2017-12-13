$(function() {
  var $allItems = $('.timeline').find('.timeline-item'),
      $filteredSet = $allItems,
      $filterInput = $('.filters input:first');

  $('.filters input').on('keyup', $.debounce(300, function(e){
    var $this = $(this),
        attr = 'data-'+$this.attr('id'),
        value = $this.val();

    //if the value is empty, show the previously hidden rows
    if (this.value !== '') {
      if ($filteredSet.length == 0) {
        $filteredSet = $allItems;
      }
      $filteredSet.hide();
      $filteredSet = $filteredSet
        .filter('['+attr+'*="'+value.toLowerCase()+'"]')
        .show();
      
    //else filter the current set of visible rows
    //according to each (other) filter input's current value
    } else {
      $filteredSet = $allItems;
      $this.siblings().each(function() {
        var $this = $(this),
            attr = 'data-'+$this.attr('id'),
            value = $this.val();

        if (value !== '') {
          $filteredSet.hide();
          $filteredSet = $filteredSet
            .filter(function(){
              $(this).attr(attr).val(value.toLowerCase());
              
              // '['+attr+'*="'+value.toLowerCase()+'"]'
            })
            .show();
        }
      });
      if ($('.filters input').filter(function() { return this.value; }).length == 0) {
        $filteredSet = $allItems;
        $filteredSet.show();
      }
    }
  }));

  //clear & reset the filters
  $('.filters button').on('click', function() {
    $('.filters input').each(function() {
      var $this = $(this);
      $this.val('');
    });
    $filterInput.trigger('keyup');
  });
});

$('a[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  }
});