/**
 * parse xml file
 * @author dingweiwang
 */


var com = window.com || {};
com.wei = window.com.wei || {};


/**
 * 
 * 
 * @param  name - the xml file name.
 *
 * @return a xml <code>Document http://www.w3.org/TR/DOM-Level-2-Core/core.html#i-Document</code> object. 
 */
com.wei.loadXmlDoc = function(fileName) {
	
	
	var xmlDoc = null; //xml document
	
	if (document.implementation 
			&& document.implementation.createDocument) {//DOM 2. Firefox, Opera, etc.
			
			//XMLDocument object
			//http://www.w3.org/TR/DOM-Level-2-Core/core.html#i-Document
		
			xmlDoc = document.implementation.createDocument("", "", null);
			xmlDoc.async = false;
			xmlDoc.load(fileName);
			
			//alert(xmlDoc.documentElement.nodeName);
			//alert(xmlDoc.namespaces[0]);
			
	}  else if (window.ActiveXObject) { //ie
		
		/*
		 * According to information on the Microsoft XML Team's WebLog
		 * it is recommended to check for availability of MSXML versions 6.0 and 3.0.
		 * Other versions are included for completeness, 5.0 is excluded as it is
		 * "off-by-default" in IE7 (which could trigger a goldbar).
		 * http://blogs.msdn.com/xmlteam/archive/2006/10/23/using-the-right-version-of-msxml-in-internet-explorer.aspx
		 * http://msdn.microsoft.com/library/default.asp?url=/library/en-us/xmlsdk/html/aabe29a2-bad2-4cea-8387-314174252a74.asp
		 */
	
		var version = [ "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.4.0", "MSXML2.DOMDocument", // v3.0
				"MSXML.DOMDocument", // v2.x
				"Microsoft.XMLDOM" // v2.x
			];  //ms xml document version 
		
		

		
		for (var i=0; i < version.length; i++) {
			try {
				xmlDoc = new ActiveXObject(version[i]);
			//	alert(i);
				break;
			} catch(e) {
				
				xmlDoc = null;
			}
		}
		
		if (xmlDoc == null) {
			alert("file: loadXMLDoc.js\n" 
				+ "line: 67\n" 
				+ "Your browser cannot handle this script");
			return null;
		}
		
		xmlDoc.async=false;
  		xmlDoc.load(fileName);
		alert(xmlDoc.documentElement.nodeName);
		
	} else {
		alert("file: loadXMLDoc.js\n" 
				+"line: 78\n" 
				+ "Your browser cannot handle this script");
	}
	
	
	
	
	return xmlDoc;
}






  //an example to parse ms ie xml.
function () { 

   xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
   xmlDoc.async = false;
   var b = xmlDoc.load("tree.xml");
   
   
   if (b == false) {
    
    alert("fail");
   }

   if(xmlDoc.parseError.errorCode != 0) {
    alert(xmlDoc.parseError.reason);
   // return;
   }
   if (xmlDoc == null) {
    
    alert("error");
    //return;
   }
   
   var nodes = xmlDoc.documentElement.childNodes;
   //alert(nodes.length);

   //var rootElement=xmlDoc.documentElement;
   //rootElement.getNodeName();
   //rootElement.hasAttribute();
   //nodes = xmlObj.childNodes;
}
   

 