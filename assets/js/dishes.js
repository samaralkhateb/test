  $(document).ready(function() {
    $("#marketing_parent").addClass("active");
    $("#dishes_tage").addClass("active");

           if($(".select").length > 0){
                $(".select").selectpicker();
                
                $(".select").on("change", function(){
                    if($(this).val() == "" || null === $(this).val()){
                        if(!$(this).attr("multiple"))
                            $(this).val("").find("option").removeAttr("selected").prop("selected",false);
                    }else{
                        $(this).find("option[value="+$(this).val()+"]").attr("selected",true);
                    }
                });
            }
            var  table =  $('#dishes').DataTable({
                    "ordering": true,
                    "destroy": true,
                    "bInfo": false,
                    "bPaginate": true,
                    "bLengthChange": true,
                    "searching": true,
                    "scrollX": true,
                  "responsive": true,
                    "bSearchable":true,
                    "bProcessing": true,
                    "deferLoading": 57,
                    "emptyTable": "No data available in table",
                    "bServerSide": false,
                    "sAjaxSource": base_url + '/dishes/dishes_report/format/json?start_date='
                    + $("#from-date").val()
                    + '&end_date='
                    + $("#to-date").val(),
            
                     dom: 'Blfrtip',
                    colReorder: true,
                        buttons: [
                    
                      {
                          extend: 'excel',
                                  
                      } 
                   ] 
                   ,      
                   "columnDefs": [
            {
                "targets": [0],
                "visible": false
            },
            {
                "targets": -1,
                "data" : null,
                "render": function ( data, type, full, meta ) {
                    var id = full[0];
//                    console.log(full[7]);
//                    if(full[7] === null)
                          return "<div class='col-md-4'><label class='check'><input type='checkbox' class='icheckbox' name='id'  value='" +  full[0] + "' /></label></div>";
                           }
            }
          ],
            
        
               
      });
         $('#form').submit( function() {
          var sData = table.$('input').serializeArray(); //creates a JavaScript array of objects, ready to be encoded as a JSON string
          $('#add_new_tag').data('data-id', sData);
                   $("#iconPreview").modal("show");

        return false;
    } );
          $('.datepicker').on('changeDate', function() {
              table.ajax.url( base_url+'/dishes/dishes_report/format/json?start_date='
                    + $("#from-date").val()
                    + '&end_date='
                    + $("#to-date").val() ).load();
    
            });
            
            ////
            
            
         
       });
        $("#add_new_tag").click(function(event) {
         var ids =  $("#add_new_tag").data('data-id');
         var tag;
         if($("#combobox").val() === "" )
           tag = $(".custom-combobox-input").val();
       else
               tag = $("#combobox").val() ;
           
         var data ={
             dishes : ids,
             tag :  tag, 
                   };
           var url =  base_url + '/dishes/add_tag';
           $.ajax(
                    {
                        url: url,
                        type: "post",
                        dataType: "json",
                        data: data,
                        success: function(response) {
                         noty({text: 'Successful action', layout: 'topRight', type: 'success'});
                        // location.reload();
                         $('#dishes').DataTable().ajax.reload(null, false);
                        },error: function(){
                         noty({text: 'error action', layout: 'topRight', type: 'error'});
                        }
                    });
           
            });

               $(".datepicker").datepicker({
                       format: 'yyyy-mm-dd' ,
                          });  
            $( ".datepicker" ).datepicker('setDate', new Date());
            
               $('body').on('hidden.bs.modal', '.modal', function () {
//             $('#tag').html("");
//            $(':input', this).val('');

          });
     $( function() {
    $.widget( "custom.combobox", {
      _create: function() {
        this.wrapper = $( "<span>" )
          .addClass( "custom-combobox" )
          .insertAfter( this.element );
 
        this.element.hide();
        this._createAutocomplete();
        this._createShowAllButton();
      },
 
      _createAutocomplete: function() {
        var selected = this.element.children( ":selected" ),
          value = selected.val() ? selected.text() : "";
 
        this.input = $( "<input>" )
          .appendTo( this.wrapper )
          .val( value )
          .attr( "title", "" )
          .addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
          .autocomplete({
            delay: 0,
            minLength: 0,
            source: $.proxy( this, "_source" )
          })
          .tooltip({
            classes: {
              "ui-tooltip": "ui-state-highlight"
            }
          });
 
        this._on( this.input, {
          autocompleteselect: function( event, ui ) {
            ui.item.option.selected = true;
            this._trigger( "select", event, {
              item: ui.item.option
            });
          },
 
          autocompletechange: "_removeIfInvalid"
        });
      },
 
      _createShowAllButton: function() {
        var input = this.input,
          wasOpen = false;
 
        $( "<a>" )
          .attr( "tabIndex", -1 )
          .attr( "title", "Show All Items" )
          .tooltip()
          .appendTo( this.wrapper )
          .button({
            icons: {
              primary: "ui-icon-triangle-1-s"
            },
            text: false
          })
          .removeClass( "ui-corner-all" )
          .addClass( "custom-combobox-toggle ui-corner-right" )
          .on( "mousedown", function() {
            wasOpen = input.autocomplete( "widget" ).is( ":visible" );
          })
          .on( "click", function() {
            input.trigger( "focus" );
 
            // Close if already visible
            if ( wasOpen ) {
              return;
            }
 
            // Pass empty string as value to search for, displaying all results
            input.autocomplete( "search", "" );
          });
      },
 
      _source: function( request, response ) {
        var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
        response( this.element.children( "option" ).map(function() {
          var text = $( this ).text();
          if ( this.value && ( !request.term || matcher.test(text) ) )
            return {
              label: text,
              value: text,
              option: this
            };
        }) );
      },
 
      _removeIfInvalid: function( event, ui ) {
 
        // Selected an item, nothing to do
        if ( ui.item ) {
          return;
        }
 
        // Search for a match (case-insensitive)
        var value = this.input.val(),
          valueLowerCase = value.toLowerCase(),
          valid = false;
        this.element.children( "option" ).each(function() {
          if ( $( this ).text().toLowerCase() === valueLowerCase ) {
            this.selected = valid = true;
            return false;
          }
        });
 
        // Found a match, nothing to do
        if ( valid ) {
          return;
        }
 
        // Remove invalid value
//        this.input
//          .val( "" )
//          .attr( "title", value + " didn't match any item" )
//          .tooltip( "open" );
//        this.element.val( "" );
//        this._delay(function() {
//          this.input.tooltip( "close" ).attr( "title", "" );
//        }, 2500 );
//        this.input.autocomplete( "instance" ).term = "";
      },
 
      _destroy: function() {
        this.wrapper.remove();
        this.element.show();
      }
    });
 
    $( "#combobox" ).combobox();
    $( "#toggle" ).on( "click", function() {
      $( "#combobox" ).toggle();
    });
  } );
