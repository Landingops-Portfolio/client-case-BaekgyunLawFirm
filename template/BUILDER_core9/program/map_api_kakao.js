// daum Map
var mapContainer = document.getElementById('AB_map_api');	// 지도를 표시할 div 
var map_lv = $(mapContainer).data('map-lv');
if (map_lv == '' || map_lv === undefined ) map_lv = 4;

mapOption = {
	center: new daum.maps.LatLng(33.450701, 126.570667),		// 지도의 중심좌표
	level: map_lv // 지도의 확대 레벨
};  

// 지도를 생성합니다    
var map = new daum.maps.Map(mapContainer, mapOption); 

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new daum.maps.services.Geocoder();

var address = $('#AB_map_addr').html();
if (!address) address = '주소를 입력해주세요.';

// 주소로 좌표를 검색합니다
geocoder.addressSearch(address, function(result, status) {
	
	// 정상적으로 검색이 완료됐으면 
	if (status === daum.maps.services.Status.OK) {
		
		var coords = new daum.maps.LatLng(result[0].y, result[0].x);
		var mt = mapContainer.getAttribute('data-mt');
		
		if (mt !== 'circle') {
			
			// 결과값으로 받은 위치를 마커로 표시합니다
			var marker = new daum.maps.Marker({
				map: map,
				position: coords
			});
			// 인포윈도우로 장소에 대한 설명을 표시합니다
			var infowindow = new daum.maps.InfoWindow({
				content: '<div style="padding:10px;letter-spacing:-0.3px; white-space:nowrap;">' + address + '</div>'
			});
			
			infowindow.open(map, marker);
			
		} else {
			var option_mt = $(mapContainer).data('option-mt');
			
			// 지도에 표시할 원을 생성합니다
			option_mt.center = coords;
			var circle = new daum.maps.Circle(option_mt);
			/*옵션메모radius: 30,		// 미터 단위의 원의 반지름입니다 
			strokeWeight: 5,			// 선의 두께입니다 
			strokeColor: '#75B8FA',	// 선의 색깔입니다
			strokeOpacity: 1,			// 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
			strokeStyle: 'dashed',	// 선의 스타일 입니다
			fillColor: '#CFE7FF',	// 채우기 색깔입니다
			fillOpacity: 0.7			// 채우기 불투명도 입니다*/
			circle.setMap(map);		// 지도에 원을 표시합니다
		}
		
		// 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
		map.setCenter(coords);
		
	} 
});