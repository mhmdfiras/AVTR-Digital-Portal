(() => {
  'use strict';
  const MAP_DATA = {"north":{"name":"North Amman","operator":"EFS","center":[32.055,35.89],"zoom":12,"districts":[{"id":"abu-nseir","name":"Abu Nseir","ar":"أبو نصير","lat":32.052,"lng":35.872,"area":"6.8 km²","population":"72,489 (2015)","location":"Northern Amman; GAM district no. 20, within the University District administrative area.","bounds":{"north":"Shafa Badran","east":"Shafa Badran","south":"Abu Nseir village area","west":"Al-Jubeiha"},"neighborhoods":["Al-Saada","Al-Mahabba","Al-Basala","Al-Amana","Al-Farouq","Al-Diyaa","Um Hubeir"],"source":"https://www.amman.jo/site_doc/abonseer.pdf"},{"id":"al-jubeiha","name":"Al-Jubeiha","ar":"الجبيهة","lat":32.026,"lng":35.875,"area":"25.9 km²","population":"197,160 (2015)","location":"North-western Amman, a major university and residential district.","bounds":{"north":"Shafa Badran + Abu Nseir","east":"Shafa Badran + Tareq","south":"Al-Abdali + Tlaa Al-Ali","west":"Tlaa Al-Ali + Sweileh"},"neighborhoods":["Al-Jamaa","Qatna","Al-Rasheed","Al-Siddiq","Al-Mansour","Islamic College","Ibn Auf","Um Zweitina","Al-Badiya","Al-Rayyan"],"source":"https://www.amman.jo/site_doc/aljbeha.pdf"},{"id":"shafa-badran","name":"Shafa Badran","ar":"شفا بدران","lat":32.088,"lng":35.931,"area":"45.7 km²","population":"72,315+ (2015)","location":"Far north of Amman, near Shafa Badran main road and the University District.","bounds":{"north":"Umm Rommana + Marj Al-Shouf","east":"Russeifa Municipality","south":"Tareq + Al-Jubeiha","west":"Abu Nseir"},"neighborhoods":["Um Hujair","Al-Qasabat","Prince Hamzah","Um Balatha","Talib Karaa","Al-Muwahideen","Al-Kom West","Al-Kom East","Marj Al-Faras","Al-Murooj","Yajouz"],"source":"https://amman.jo/site_doc/shfabdran.pdf"}]},"east":{"name":"East Amman","operator":"EFS","center":[31.988,36.015],"zoom":12,"districts":[{"id":"tareq","name":"Tareq","ar":"طارق","lat":32.018,"lng":35.966,"area":"26.8 km²","population":"175,194 (2015)","location":"North-eastern Amman, in Liwa Marka, along Tareq Main Street / Tabarbour corridor; roughly 840–910 m above sea level.","bounds":{"north":"Shafa Badran","east":"Marka","south":"Basman","west":"Al-Jubeiha"},"neighborhoods":["Al-Khazna","Tabarbour","Abu Alia","Al-Ghaba","Al-Faisal","Ain Irbat","Ain Ghazal","Al-Hussein Bin Abdullah","Al-Shaheed North","Al-Shaheed South"],"source":"https://www.amman.jo/site_doc/tareq.pdf"},{"id":"al-nasr","name":"Al-Nasr","ar":"النصر","lat":31.973,"lng":35.968,"area":"28.4 km²","population":"258,829 (2015)","location":"Eastern Amman; one of GAM’s older districts, including major transport corridors and historic railway infrastructure.","bounds":{"north":"Marka / Al-Furusiya St.","east":"Ring Road / Al Ghabawi direction","south":"Al-Quwaysimah + Abu Alanda + Al-Yarmouk","west":"Basman / Al-Mahatta St."},"neighborhoods":["Jabal Al-Nasr","Princess Alia","Prince Hassan","Al-Rabwa","Al-Manara","Salehiyat Al-Abed"],"source":"https://amman.jo/site_doc/alnaser.pdf"},{"id":"uhud","name":"Uhud","ar":"أُحد","lat":31.944,"lng":36.105,"area":"262.9 km²","population":"40,498 (2015)","location":"The broad eastern edge of Greater Amman; established as a GAM district in 2005 and renamed Uhud in 2006.","bounds":{"north":"Russeifa + Marka","east":"Al-Muwaqqar + Al-Adam","south":"Sahab","west":"Al-Quwaysimah + Al-Nasr + Marka"},"neighborhoods":["No neighborhoods listed in the GAM district profile."],"source":"https://www.amman.jo/site_doc/ohd.pdf"}]},"west":{"name":"West Amman","operator":"IMDAAD","center":[31.965,35.82],"zoom":12,"districts":[{"id":"badr-al-jadida","name":"Badr Al-Jadida","ar":"بدر الجديدة","lat":31.989,"lng":35.754,"area":"21.9 km²","population":"17,891 (2015)","location":"Western Amman, a high-elevation Shafa-Ghori district overlooking the western landscape.","bounds":{"north":"Sweileh","east":"Wadi Al-Seer","south":"Wadi Al-Seer","west":"Mahis + Fuheis municipalities"},"neighborhoods":["Al-Ghrous","Um Al-Aswad","Al-Suweisa","Al-Rabahieh","Zabda","Bilal"],"source":"https://amman.jo/site_doc/bdernew.pdf"},{"id":"sweileh","name":"Sweileh","ar":"صويلح","lat":32.035,"lng":35.821,"area":"24.2 km²","population":"15,101 (2015 profile)","location":"North-western Amman; one of the city’s older elevated districts and a historic gateway toward Salt.","bounds":{"north":"Ain Al-Basha Municipality","east":"Al-Jubeiha + Tlaa Al-Ali","south":"Wadi Al-Seer + Badr Al-Jadida","west":"Fuheis Municipality"},"neighborhoods":["Al-Kamaliya","Eastern Quarter","Al-Fadila","Al-Rahmaniya","Al-Bashaer","Maysaloun","Al-Hussein Parks","Al-Furusiya","Al-Humr","Dabouq"],"source":"https://www.ammancity.gov.jo/site_doc/swelh.pdf"},{"id":"wadi-al-seer","name":"Wadi Al-Seer","ar":"وادي السير","lat":31.954,"lng":35.82,"area":"59 km²","population":"260,348 (2015)","location":"Western Amman, extending across Wadi Al-Seer and major west-Amman residential/commercial neighborhoods.","bounds":{"north":"Tlaa Al-Ali + Sweileh","east":"Zahran + Um Qseir","south":"Marj Al-Hamam + Al-Muqabalein","west":"Badr Al-Jadida"},"neighborhoods":["Wadi Al-Seer","Al-Kursi","Al-Diyar","Al-Sweifieh","Al-Jandaweel","Um Uthaina West","Al-Rawnaq","Al-Dhahir","Medical City","Al-Rawabi","Al-Sinaa"],"source":"https://www.amman.jo/site_doc/wadialseer.pdf"},{"id":"marj-al-hamam","name":"Marj Al-Hamam","ar":"مرج الحمام","lat":31.899,"lng":35.833,"area":"51 km²","population":"108,165 (2015)","location":"South-western / western Amman, a major residential growth corridor toward Naour and Airport Road approaches.","bounds":{"north":"Wadi Al-Seer","east":"Al-Muqabalein + Khreibet Al-Souq","south":"Naour","west":"Jordan Valley side + Wadi Al-Seer"},"neighborhoods":["Al-Tilal","Um Al-Summaq","Al-Quds","Aliya Housing","Rabwat Al-Marj","Al-Nakheel","Al-Marj","Al-Baladiya","Um Abhara","Wadi Al-Shita"],"source":"https://www.amman.jo/site_doc/mrjalhmam.pdf"}]},"south":{"name":"South Amman","operator":"IMDAAD","center":[31.89,35.92],"zoom":12,"districts":[{"id":"ras-al-ain","name":"Ras Al-Ain","ar":"رأس العين","lat":31.936,"lng":35.908,"area":"6.7 km²","population":"138,024 (2015)","location":"Central-southern Amman, close to downtown and major east–west / north–south urban corridors.","bounds":{"north":"Al-Madina","east":"Al-Yarmouk + Al-Quwaysimah","south":"Al-Muqabalein","west":"Badr / Nazzal"},"neighborhoods":["Al-Rawda","Al-Natheef","Al-Zohour"],"source":"https://www.amman.jo/site_doc/rasalaeen.pdf"},{"id":"al-quwaysimah","name":"Al-Quwaysimah","ar":"القويسمة","lat":31.914,"lng":35.951,"area":"45.6 km²","population":"296,763 (2015)","location":"South-eastern Amman, a large urban district connected to the Ring Road and Sahab corridor.","bounds":{"north":"Al-Nasr / Ten Bridges corridor","east":"Uhud + Sahab / Ring Road","south":"Khreibet Al-Souq","west":"Ras Al-Ain + Um Qseir / Al-Muqabalein"},"neighborhoods":["Al-Quwaysimah","Hittin","Al-Jweideh","Abu Alanda","Al-Orouba","Al-Raqeem","Um Al-Hiran","Al-Nahda","Um Nuwara","Al-Maadi"],"source":"https://www.amman.jo/site_doc/alqwesmeh.pdf"},{"id":"al-muqabalein","name":"Al-Muqabalein","ar":"المقابلين","lat":31.904,"lng":35.888,"area":"23.1 km²","population":"99,738 (2015)","location":"Southern Amman, strategically close to Airport Road and the city’s southern approaches.","bounds":{"north":"Ras Al-Ain + Badr","east":"Al-Quwaysimah","south":"Khreibet Al-Souq","west":"Wadi Al-Seer + Marj Al-Hamam"},"neighborhoods":["Al-Hurriya","Al-Hasaniya","Um Qseir","Al-Sahaba","Al-Karama","Al-Bunayyat North","Al-Bunayyat South","Al-Muqabalein"],"source":"https://www.amman.jo/site_doc/almqablin.pdf"},{"id":"khreibet-al-souq","name":"Khreibet Al-Souq","ar":"خريبة السوق","lat":31.842,"lng":35.914,"area":"49.1 km²","population":"188,356 (2015)","location":"About 11 km south of central Amman; a southern gateway district including Jawa and Al-Yadudah areas.","bounds":{"north":"Al-Muqabalein","east":"Sahab + Al-Quwaysimah","south":"Al-Jeeza Municipality","west":"Marj Al-Hamam"},"neighborhoods":["Ghamdan","Al-Furqan","Al-Majd","Al-Iman","Al-Wafaa","Quba","Al-Andalus","Khreibet Al-Souq","Jawa North","Al-Amal","Jawa South","Al-Yadudah"],"source":"https://www.amman.jo/site_doc/khrebtalssoq.pdf"}]},"central":{"name":"Central Amman","operator":"CITY BLUE","center":[31.955,35.915],"zoom":13,"districts":[{"id":"basman","name":"Basman","ar":"بسمان","lat":31.978,"lng":35.948,"area":"13.4 km²","population":"361,525 (2015)","location":"North-east of Amman’s urban core; one of the historic districts of the capital.","bounds":{"north":"Tareq","east":"Tareq + Marka","south":"Al-Abdali + Al-Madina","west":"Al-Abdali"},"neighborhoods":["Al-Hashmi Al-Shamali","Raghadan","Al-Riwaq","Al-Jarn","Al-Qusour","Jabal Al-Nuzha"],"source":"https://www.amman.jo/site_doc/bsmaan.pdf"},{"id":"al-abdali","name":"Al-Abdali","ar":"العبدلي","lat":31.967,"lng":35.911,"area":"10.9 km²","population":"165,333 (2015)","location":"At the heart of Amman, covering key governmental, diplomatic, commercial and cultural landmarks.","bounds":{"north":"Al-Jubeiha / Al-Shaheed corridor","east":"Central/eastern corridors toward Basman","south":"Zahran + Al-Madina","west":"Tlaa Al-Ali side"},"neighborhoods":["Jabal Al-Lweibdeh","Jabal Al-Hussein","Shmeisani","Sports City"],"source":"https://www.amman.jo/site_doc/alabdly.pdf"},{"id":"zahran","name":"Zahran","ar":"زهران","lat":31.952,"lng":35.885,"area":"13.8 km²","population":"107,529 (2015)","location":"Central-western Amman, including Jabal Amman, Abdoun and major diplomatic/governmental areas.","bounds":{"north":"Al-Abdali + Tlaa Al-Ali","east":"Al-Madina","south":"Al-Muqabalein + Badr","west":"Wadi Al-Seer"},"neighborhoods":["Jabal Amman","Abdoun North","Al-Radwan","Um Uthaina East","Abdoun South"],"source":"https://www.amman.jo/site_doc/zhran.pdf"},{"id":"al-madina","name":"Al-Madina","ar":"المدينة","lat":31.952,"lng":35.935,"area":"3.1 km²","population":"47,444 (2015)","location":"Downtown / central Amman, encompassing the historic and commercial urban core.","bounds":{"north":"Basman","east":"Marka + Al-Yarmouk + Al-Nasr","south":"Al-Yarmouk + Ras Al-Ain + Badr","west":"Al-Abdali + Zahran + Badr"},"neighborhoods":["Wadi Al-Surur","Al-Hashmi Al-Janoubi","Al-Rujm","Al-Muhajireen","Jabal Al-Jofeh","Al-Mudarraj","Al-Adliya","Wadi Al-Haddada","Jabal Al-Qalaa"],"source":"https://www.amman.jo/site_doc/almdeneh.pdf"},{"id":"al-yarmouk","name":"Al-Yarmouk","ar":"اليرموك","lat":31.941,"lng":35.952,"area":"5.18 km²","population":"180,773 (2015)","location":"Central Amman, an established dense urban district east of Ras Al-Ain.","bounds":{"north":"Al-Madina","east":"Al-Quwaysimah + Al-Nasr","south":"Al-Quwaysimah","west":"Ras Al-Ain"},"neighborhoods":["Al-Ashrafiya","Al-Odeh","Al-Taj"],"source":"https://amman.jo/site_doc/alyrmook.pdf"},{"id":"badr-nazzal","name":"Badr Nazzal","ar":"بدر نزال","lat":31.928,"lng":35.9,"area":"9.8 km²","population":"229,308 (2015)","location":"South-central Amman, around Nazzal and Badr neighborhoods, close to Ras Al-Ain and the Zahran / Muqablein corridors.","adjacent":["Ras Al-Ain","Um Qseir / Al-Muqabalein","Al-Madina","Zahran"],"neighborhoods":["Al-Akhdar","Al-Thiraa","Al-Yasmeen","Al-Haraniya","Al-Hilal"],"source":"https://www.amman.jo/site_doc/bder.pdf"}]}};
  window.AVTR_DISTRICT_DATA = MAP_DATA;
  const host = document.getElementById('districtMap');
  if (!host || typeof window.L === 'undefined') return;
  const sectorKey = host.dataset.sector;
  const sector = MAP_DATA[sectorKey];
  if (!sector) return;

  const map = L.map(host, {scrollWheelZoom:false, zoomControl:true, attributionControl:true, tap:true}).setView(sector.center, sector.zoom);
  // API-key-free basemaps. OpenStreetMap is the default; HOT is an alternate style.
  const street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom:19,
    attribution:'&copy; OpenStreetMap contributors',
    crossOrigin:true
  });
  const detailed = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom:19,
    attribution:'&copy; OpenStreetMap contributors, Tiles style by HOT',
    crossOrigin:true
  });
  street.addTo(map);
  L.control.layers({'Street map':street,'Detailed map':detailed}, null, {position:'topright', collapsed:true}).addTo(map);

  // If an alternate tile provider is temporarily unavailable, fall back to OSM automatically.
  detailed.on('tileerror', () => {
    if (map.hasLayer(detailed)) {
      map.removeLayer(detailed);
      if (!map.hasLayer(street)) street.addTo(map);
    }
  });
  L.control.scale({imperial:false, position:'bottomright'}).addTo(map);

  const markers = {};
  const markerIcon = (n, active=false) => L.divIcon({className:'', html:`<div class="district-map-marker${active?' active':''}">${String(n).padStart(2,'0')}</div>`, iconSize:[38,38], iconAnchor:[19,19], popupAnchor:[0,-18]});
  sector.districts.forEach((d,i)=>{
    const m=L.marker([d.lat,d.lng],{icon:markerIcon(i+1,i===0)}).addTo(map);
    m.bindTooltip(`${d.name} • ${d.ar}`, {direction:'top', offset:[0,-14], opacity:.94});
    m.on('click',()=>selectDistrict(d.id,true));
    markers[d.id]=m;
  });

  const buttons=[...document.querySelectorAll('[data-district-id]')];
  const nodes={
    eyebrow:document.querySelector('[data-district-eyebrow]'), name:document.querySelector('[data-district-name]'), ar:document.querySelector('[data-district-ar]'),
    location:document.querySelector('[data-district-location]'), area:document.querySelector('[data-district-area]'), population:document.querySelector('[data-district-population]'),
    bounds:document.querySelector('[data-district-bounds]'), neighborhoods:document.querySelector('[data-district-neighborhoods]'),
    maps:document.querySelector('[data-district-maps]'), source:document.querySelector('[data-district-source]')
  };

  function boundaryHTML(d){
    if(d.bounds){
      const b=d.bounds;
      return `<div class="boundary-grid">
        <div class="boundary north"><small>NORTH</small><strong>${b.north||'—'}</strong></div>
        <div class="boundary west"><small>WEST</small><strong>${b.west||'—'}</strong></div>
        <div class="boundary-center"><i class="bi bi-compass"></i><span>ADMINISTRATIVE<br/>BOUNDARY RELATION</span></div>
        <div class="boundary east"><small>EAST</small><strong>${b.east||'—'}</strong></div>
        <div class="boundary south"><small>SOUTH</small><strong>${b.south||'—'}</strong></div>
      </div>`;
    }
    return `<div class="adjacent-list"><small>ADJACENT GAM AREAS</small>${(d.adjacent||[]).map(x=>`<span>${x}</span>`).join('')}</div>`;
  }

  function selectDistrict(id, fromMarker=false){
    const d=sector.districts.find(x=>x.id===id); if(!d) return;
    buttons.forEach(btn=>btn.classList.toggle('active',btn.dataset.districtId===id));
    sector.districts.forEach((item,i)=>markers[item.id]?.setIcon(markerIcon(i+1,item.id===id)));
    if(nodes.eyebrow) nodes.eyebrow.textContent=`${sector.name.toUpperCase()} • ${sector.operator}`;
    if(nodes.name) nodes.name.textContent=d.name;
    if(nodes.ar) nodes.ar.textContent=d.ar;
    if(nodes.location) nodes.location.textContent=d.location;
    if(nodes.area) nodes.area.textContent=d.area || '—';
    if(nodes.population) nodes.population.textContent=d.population || '—';
    if(nodes.bounds) nodes.bounds.innerHTML=boundaryHTML(d);
    if(nodes.neighborhoods) nodes.neighborhoods.innerHTML=(d.neighborhoods||[]).map(x=>`<span>${x}</span>`).join('');
    if(nodes.maps) nodes.maps.href=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.name+', Amman, Jordan')}`;
    if(nodes.source) nodes.source.href=d.source;
    map.flyTo([d.lat,d.lng], Math.max(sector.zoom+1,13), {duration:.7});
    if(!fromMarker) markers[id]?.openTooltip();
  }
  buttons.forEach(btn=>btn.addEventListener('click',()=>{
    selectDistrict(btn.dataset.districtId);
    const target=document.querySelector('.district-explorer-grid');
    if(window.innerWidth<760 && target) target.scrollIntoView({behavior:'smooth',block:'start'});
  }));

  const fitBtn=document.querySelector('[data-fit-sector]');
  fitBtn?.addEventListener('click',()=>{
    const group=L.featureGroup(Object.values(markers));
    map.fitBounds(group.getBounds().pad(.22),{animate:true});
  });
  const locateBtn=document.querySelector('[data-locate-user]');
  locateBtn?.addEventListener('click',()=>{
    if(!navigator.geolocation){locateBtn.textContent='LOCATION NOT AVAILABLE'; return;}
    const old=locateBtn.innerHTML; locateBtn.innerHTML='<i class="bi bi-hourglass-split"></i> LOCATING…';
    navigator.geolocation.getCurrentPosition(pos=>{
      const p=[pos.coords.latitude,pos.coords.longitude];
      L.circleMarker(p,{radius:8,color:'#147a4b',fillColor:'#31a56d',fillOpacity:.9,weight:3}).addTo(map).bindPopup('Your current location').openPopup();
      map.flyTo(p,14,{duration:.7}); locateBtn.innerHTML=old;
    },()=>{locateBtn.innerHTML=old; alert('Location access was not available. Open the site over HTTPS and allow location permission.');},{enableHighAccuracy:true,timeout:8000});
  });

  selectDistrict(sector.districts[0].id);
  setTimeout(()=>map.invalidateSize(),180);
})();