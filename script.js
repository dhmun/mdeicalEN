
document.addEventListener('DOMContentLoaded', function () {
    const summaryData = window.summaryMedicalData || {};
    const detailedData = window.detailedMedicalData || {};

    const mapContainer = document.querySelector('.map-container');
    const svg = document.getElementById('svgMain');
    if (!svg || !mapContainer) return;

    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    mapContainer.appendChild(tooltip);

    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalTableBody = document.querySelector('#modal-table tbody');

    const provinces = svg.querySelectorAll('g[id]');
    let activeProvinceShape = null;

    provinces.forEach(province => {
        const provinceId = province.id;
        const shape = province.querySelector('.shape');

        if (shape && summaryData[provinceId]) {
            shape.addEventListener('mouseover', e => {
                const data = summaryData[provinceId];
                tooltip.style.opacity = 1;
                tooltip.innerHTML = `<b>${data.name}</b><br>Total Facilities: ${data['Total']}`;
            });
           shape.addEventListener('mousemove', e => {
                const tooltipWidth = tooltip.offsetWidth;
                const tooltipHeight = tooltip.offsetHeight;
                const cursorPadding = 15; // 커서와의 간격
                
                let left = e.clientX + cursorPadding;
                let top = e.clientY + cursorPadding;

                // 화면 오른쪽 가장자리를 벗어나는지 확인
                if (left + tooltipWidth > window.innerWidth) {
                    left = e.clientX - tooltipWidth - cursorPadding;
                }
                
                // 화면 아래쪽 가장자리를 벗어나는지 확인
                if (top + tooltipHeight > window.innerHeight) {
                    top = e.clientY - tooltipHeight - cursorPadding;
                }

                tooltip.style.left = `${left}px`;
                tooltip.style.top = `${top}px`;
            });
            shape.addEventListener('mouseout', () => { tooltip.style.opacity = 0; });

            shape.addEventListener('click', () => {
                if (activeProvinceShape) activeProvinceShape.classList.remove('active');
                shape.classList.add('active');
                activeProvinceShape = shape;

                const provinceName = summaryData[provinceId].name;
                const facilities = detailedData[provinceId] || [];

                modalTitle.textContent = `${provinceName} - Detailed List (${facilities.length} facilities)`;
                modalTableBody.innerHTML = '';

                if (facilities.length > 0) {
                    const rowsHtml = facilities.map(f => `
                        <tr>
                            <td>${f['Category'] || ''}</td>
                            <td>${f['Name'] || ''}</td>
                            <td>${f['Address'] || ''}</td>
                            <td>${f['Nearby_Facilities'] || ''}</td>
                        </tr>`).join('');
                    modalTableBody.innerHTML = rowsHtml;
                } else {
                    modalTableBody.innerHTML = '<tr><td colspan="4">No detailed data for this province.</td></tr>';
                }
                modalOverlay.classList.add('visible');
            });
        }
    });

    modalCloseBtn.addEventListener('click', () => modalOverlay.classList.remove('visible'));
    modalOverlay.addEventListener('click', e => {
        if (e.target === modalOverlay) modalOverlay.classList.remove('visible');
    });
});
