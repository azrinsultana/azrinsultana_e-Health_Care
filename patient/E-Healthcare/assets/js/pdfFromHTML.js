function HTMLtoPDF(){
var pdf = new jsPDF('p', 'pt', 'letter');
source = $('#HTMLtoPDF')[0];
specialElementHandlers = {
	'#bypassme': function(element, renderer){
		return true
	}
}
margins = {
    top: 50,
    left: 60,
    width: 545
  };
pdf.fromHTML(
  	source // HTML string or DOM elem ref.
  	, margins.left // x coord
  	, margins.top // y coord
  	, {
  		'width': margins.width // max width of content on PDF
  		, 'elementHandlers': specialElementHandlers
  	},
  	function (dispose) {
  	  // dispose: object with X, Y of the last line add to the PDF
  	  //          this allow the insertion of new lines after html
        pdf.save('html2pdf.pdf');
      }
  )		
}


function HTMLtoPDF_patient(){
	var pdf = new jsPDF('p', 'pt', 'letter');
	source = $('#HTMLtoPDF_patient')[0];
	
	specialElementHandlers = {
		'#bypassme': function(element, renderer){
			return true
		}
	
	
	
	}
	margins = {
		top: 50,
		left: 60,
		width: 545
	  };
	pdf.fromHTML(
		  source // HTML string or DOM elem ref.
		  , margins.left // x coord
		  , margins.top // y coord
		  , {
			  'width': margins.width // max width of content on PDF
			  , 'elementHandlers': specialElementHandlers
		  },
		  function (dispose) {
			// dispose: object with X, Y of the last line add to the PDF
			//          this allow the insertion of new lines after html
			pdf.save('Payment.pdf');
		  }
	  )		
	}
	function HTMLtoPDF_prescription(){
	var pdf = new jsPDF('p', 'pt', 'letter');
	source = $('#HTMLtoPDF_prescription')[0];
	
	specialElementHandlers = {
		'#bypassme': function(element, renderer){
			return true
		}
	
	
	
	}
	margins = {
		top: 50,
		left: 60,
		width: 545
	  };
	pdf.fromHTML(
		  source // HTML string or DOM elem ref.
		  , margins.left // x coord
		  , margins.top // y coord
		  , {
			  'width': margins.width // max width of content on PDF
			  , 'elementHandlers': specialElementHandlers
		  },
		  function (dispose) {
			// dispose: object with X, Y of the last line add to the PDF
			//          this allow the insertion of new lines after html
			pdf.save('Prescription.pdf');
		  }
	  )		
	}