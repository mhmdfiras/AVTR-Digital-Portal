(() => {
  const form = document.getElementById('complaintForm');
  if (!form) return;

  const $ = (id) => document.getElementById(id);
  const ref = `AVTR-${new Date().toISOString().slice(0,10).replaceAll('-','')}-${Math.random().toString(36).slice(2,8).toUpperCase()}`;
  $('referenceField').value = ref;
  $('referencePreview').textContent = ref;
  $('subjectField').value = `New AVTR Complaint | ${ref}`;

  const basePath = location.pathname.replace(/[^/]*$/, '');
  $('nextField').value = `${location.origin}${basePath}complaint-success.html?ref=${encodeURIComponent(ref)}`;

  const description = $('description');
  const descriptionCount = $('descriptionCount');
  description.addEventListener('input', () => descriptionCount.textContent = description.value.length);

  const locationBtn = $('locationBtn');
  const locationResult = $('locationResult');
  locationBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
      locationBtn.classList.add('error');
      locationBtn.querySelector('small').textContent = 'Location is not supported by this browser.';
      return;
    }
    locationBtn.classList.add('loading');
    locationBtn.querySelector('strong').textContent = 'Getting your location…';
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude.toFixed(6);
      const lng = pos.coords.longitude.toFixed(6);
      const maps = `https://www.google.com/maps?q=${lat},${lng}`;
      $('coordinatesField').value = `${lat}, ${lng}`;
      $('mapsField').value = maps;
      locationResult.href = maps;
      locationResult.classList.remove('is-empty');
      locationResult.querySelector('strong').textContent = 'GPS location added';
      locationResult.querySelector('small').textContent = `${lat}, ${lng} • Open map`;
      locationBtn.classList.remove('loading','error');
      locationBtn.classList.add('success');
      locationBtn.querySelector('strong').textContent = 'Current location captured';
      locationBtn.querySelector('small').textContent = 'Coordinates are included with the complaint.';
    }, (err) => {
      locationBtn.classList.remove('loading','success');
      locationBtn.classList.add('error');
      locationBtn.querySelector('strong').textContent = 'Location was not added';
      locationBtn.querySelector('small').textContent = err.code === 1 ? 'Location permission was denied. Enter the address manually.' : 'Could not read location. Enter the address manually.';
    }, {enableHighAccuracy:true, timeout:12000, maximumAge:30000});
  });

  const photoInput = $('photoInput');
  const uploadPreview = $('uploadPreview');
  const uploadEmpty = $('uploadEmpty');
  const previewImage = $('previewImage');
  const previewName = $('previewName');
  const previewSize = $('previewSize');
  const removePhoto = $('removePhoto');
  let objectUrl = null;

  const resetPhoto = () => {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = null;
    photoInput.value = '';
    uploadPreview.hidden = true;
    uploadEmpty.hidden = false;
  };

  photoInput.addEventListener('change', () => {
    const file = photoInput.files?.[0];
    if (!file) return resetPhoto();
    if (file.size > 10 * 1024 * 1024) {
      alert('Please choose an image smaller than 10 MB.');
      return resetPhoto();
    }
    if (!['image/jpeg','image/png','image/webp'].includes(file.type)) {
      alert('Please choose a JPG, PNG or WEBP image.');
      return resetPhoto();
    }
    objectUrl = URL.createObjectURL(file);
    previewImage.src = objectUrl;
    previewName.textContent = file.name;
    previewSize.textContent = `${(file.size / 1024 / 1024).toFixed(2)} MB`;
    uploadEmpty.hidden = true;
    uploadPreview.hidden = false;
  });
  removePhoto.addEventListener('click', resetPhoto);

  form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
    }
  });})();
