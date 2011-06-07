function nl2br(str) { return str.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '<br>'); }

$(document).ready(function(){
        $.ajax({
            type: "GET",
            url: "post_db.xml",
            dataType: "xml",
            success: function(xml) {
                $(xml).find('post').each(function(i){
                    var ts = $(this).attr('id');
                    var title = $(this).find('title').text();
                    var content = nl2br( $(this).find('content').text() );
                    $('<div class="items" ></div>').html('<br><b>timestamp: </b>'+ts+'<b$
                });
            }
        });
    });


xmlDoc=loadXMLDoc("post_db.xml");

x=xmlDoc.getElementsByTagName('title');
for (i=0;i<x.length;i++)
{
document.write(x[i].childNodes[0].nodeValue);
document.write("<br>");
}
