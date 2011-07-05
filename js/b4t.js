function nl2br(str) { return str.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '<br>'); }

  
$(document).ready(function(){
		$.ajax({
			type: "GET",
			url: "post_db.xml",
			dataType: "xml",
			success: function(xml) { 
				$(xml).find('post').each(
				  function(i){
					var ts = $(this).attr('id');
					var title = $(this).find('title').text();
					var content = nl2br( $(this).find('content').text() );
					$('<section></section>').html('<br><b>timestamp: </b>'+ts+'<br><b>title: </b>'+title+'<br><section><b>content:</b>'+content+'</section><br><hr>').appendTo('#page-wrap');
				  }
				);
			}
		});
	});
