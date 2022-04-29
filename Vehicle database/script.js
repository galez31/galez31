

function funk() {

	let url = 'https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=' + document.getElementById('numcar').value;



	var numcar = document.getElementById('numcar').value;


	if (numcar.length < 6 || numcar.length > 8) {

		alert('Tray a number between 6-8 ');
		document.getElementById('numcar').value = '';

	} else {


		fetch(url)
			.then((list) => list.json())
			.then((car) => {
				let carr = car.result.records[0]
				if (carr) {

					let aa = '<tr><td>' + carr.tzeva_rechev + '</td><td>' + carr.degem_nm + '</td><td>' + carr.tokef_dt  + '</td><td>' + carr.shnat_yitzur + '</td><td>' + carr.tozeret_nm  +  '</td><td>' + numcar + '</td></tr>';

					document.getElementById('det').insertAdjacentHTML('beforeend' , aa);
					document.getElementById('numcar').value = '';



				} else {

					alert('not fund');
					document.getElementById('numcar').value = '';
					

				}



			});



	};


}
 