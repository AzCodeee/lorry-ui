const MOCK_DATA = [
    {
        id: 'deluxeKing',
        name: 'Deluxe King',
        rates: [{
            rateName: 'Standard Rate',
            availability: [21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21],
            prices: [210, 210, 210, 210, 210, 210, 210, 210, 210, 210, 210, 210, 210, 210],
        }],
    },
    {
        id: 'deluxeTriple',
        name: 'Deluxe Triple',
        rates: [{
            rateName: 'Standard Rate',
            availability: [4, 5, 5, 5, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5],
            prices: [256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256],
        }],
    },
    {
        id: 'standardSingle',
        name: 'Standard Single',
        rates: [{
            rateName: 'Standard Rate',
            availability: [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            prices: [132, 132, 132, 132, 132, 132, 132, 132, 132, 132, 132, 132, 132, 132],
        }],
    },
    {
        id: 'standardTwin',
        name: 'Standard Twin',
        rates: [{
            rateName: 'Standard Rate',
            availability: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
            prices: [163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163, 163],
        }],
    },
];

const DISPLAY_DAYS = 14;
let currentDate = new Date('2025-11-27T00:00:00');


// Using a slightly smaller SVG as requested in previous exchanges
const ICON_SVG = `<span class="cursor-pointer" data-bs-toggle="modal" data-bs-target="#bulk">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
</span>`;


function getDateInfo(date) {
    // Get today's date, normalized to start of day for accurate comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0);

    const isToday = dateToCheck.getTime() === today.getTime();
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    let dayText = date.toLocaleDateString('en-US', { weekday: 'short' });
    if (isToday) {
        dayText = 'TODAY';
    }

    return {
        isWeekend: isWeekend,
        isToday: isToday,
        day: dayText,
        dateNum: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    };
}

function renderDateHeader() {
    const dateHeaderRow = document.getElementById('date-header-row');
    const currentDateSpan = document.getElementById('current-date-span');
    dateHeaderRow.innerHTML = '';

    const displayedMonth = currentDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    currentDateSpan.textContent = displayedMonth;

    for (let i = 0; i < DISPLAY_DAYS; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);
        const info = getDateInfo(date);

        // Reverting highlight logic to previous weekend style
        const isHighlighted = info.isWeekend || info.isToday;
        const highlightClass = isHighlighted ? 'bg-orange-100' : 'bg-white';
        const textClass = isHighlighted ? 'text-orange-600' : 'text-gray-700';
        const todayClass = info.isToday ? '' : '';

        const dateCell = `
                <div class="w-20 h-20 flex-1 border-r border-transparent flex flex-col justify-center items-center text-xs font-semibold ${highlightClass} ${todayClass}">
                    <span class="${textClass}">${info.day}</span>
                    <span class="text-xl ${textClass}">${info.dateNum}</span>
                    <span class="font-normal text-muted ${textClass}">${info.month}</span>
                </div>
            `;
        dateHeaderRow.insertAdjacentHTML('beforeend', dateCell);
    }
}

function renderRoomData() {
    const container = document.getElementById('room-rows-container');
    container.innerHTML = '';

    MOCK_DATA.forEach(room => {
        room.rates.forEach(rate => {
            const roomCard = document.createElement('div');
            roomCard.className = 'card bg-white border border-gray-200 first:rounded-tr-none! rounded-lg mb-3 shadow-sm overflow-hidden';

            const availRow = document.createElement('div');
            availRow.className = 'flex border-b border-gray-200';

            availRow.innerHTML += `
                <div class="fixed-col-width border-r border-gray-200 sticky-col row-height flex items-center bg-gray-100">
                    <div class="flex items-center px-3 h-full border-r border-gray-200 min-w-[18rem] shrink-0 gap-2">
                        <i class="ti ti-bed text-lg"></i>
                        <span class="text-sm font-semibold text-gray-800">${room.name}</span>
                        <div class="ml-auto">
                            ${ICON_SVG}
                        </div>
                    </div>
                    
                    <div class="grow flex items-center px-3 min-w-26 text-[0.65rem]">
                        <span class="text-gray-600 font-medium">AVAILABILITY</span>
                    </div>
                </div>
            `;

            const scrollableAvailData = document.createElement('div');
            scrollableAvailData.className = 'flex w-full';
            for (let i = 0; i < DISPLAY_DAYS; i++) {
                const date = new Date(currentDate);
                date.setDate(currentDate.getDate() + i);
                const info = getDateInfo(date);

                const isHighlighted = info.isWeekend || info.isToday;
                const highlightClass = isHighlighted ? 'bg-orange-100' : '';
                const borderClass = info.isToday ? 'border-gray-200' : 'border-gray-200';

                const availability = rate.availability[i] !== undefined ? rate.availability[i] : '-';
                const availZeroClass = availability === 0 ? 'bg-red-200' : 'bg-gray-100';

                scrollableAvailData.innerHTML += `
                    <div class="w-20 h-10 flex-1 px-1.5 row-height flex items-center justify-center nth-last-[1]:border-r-0 border-r ${borderClass} ${availZeroClass} ${highlightClass}">
                        <input type="text" value="${availability}" class="text-gray-700 bg-white px-1 border border-gray-50 rounded-md text-sm font-semibold text-center max-w-full focus:outline-0" />
                    </div>
                `;
            }
            availRow.appendChild(scrollableAvailData);
            roomCard.appendChild(availRow);


            const rateRow = document.createElement('div');
            rateRow.className = 'flex';

            rateRow.innerHTML += `
                <div class="fixed-col-width bg-white border-r border-gray-200 sticky-col row-height flex items-center">
                    <div class="flex items-center h-10 px-3 text-sm border-r border-gray-200 min-w-[18rem] shrink-0">
                        <span class="text-gray-600">${rate.rateName}</span>
                        <div class="ml-auto">
                            ${ICON_SVG}
                        </div>
                    </div>

                    <div class="grow flex items-center min-w-26 px-3 text-[0.65rem]">
                        <span class="text-gray-600 font-medium">RATES</span>
                    </div>
                </div>
            `;

            const scrollablePriceData = document.createElement('div');
            scrollablePriceData.className = 'flex w-full';
            for (let i = 0; i < DISPLAY_DAYS; i++) {
                const date = new Date(currentDate);
                date.setDate(currentDate.getDate() + i);
                const info = getDateInfo(date);

                const isHighlighted = info.isWeekend || info.isToday;
                const highlightClass = isHighlighted ? 'bg-orange-100' : '';
                const borderClass = info.isToday ? 'border-gray-200' : 'border-gray-200';


                const price = rate.prices[i] !== undefined ? rate.prices[i] : '-';

                scrollablePriceData.innerHTML += `
                    <div class="w-20 flex-1 px-1.5 row-height flex items-center justify-center text-sm nth-last-[1]:border-r-0 border-r ${borderClass} ${highlightClass}">
                        <input class="text-gray-700 text-center max-w-full focus:outline-0" value="${price}" />
                    </div>
                `;
            }

            rateRow.appendChild(scrollablePriceData);
            roomCard.appendChild(rateRow);
            container.appendChild(roomCard);
        });
    });
}

function changeDate(days) {
    currentDate.setDate(currentDate.getDate() + days);
    renderTable();
}

function goToToday() {
    const today = new Date();
    currentDate = new Date(today);
    currentDate.setHours(0, 0, 0, 0);
    renderTable();
}

function renderTable() {
    renderDateHeader();
    renderRoomData();
}

document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    currentDate = today;
    renderTable();
});



let rangeCount = 1;

// --- Helper Functions ---

/**
 * Generates the HTML string for a new date range input block.
 * @param {number} id The unique identifier for this range.
 * @returns {string} The HTML for the new range group.
 */
function createDateRangeHTML(id) {
    // Note: The input has a unique ID: 'date-input-${id}' for daterangepicker targeting
    return `
        <div class="date-range-group group flex items-center gap-3 mt-3" id="range-group-${id}">
            <div>
                <h4 class="form-label required">Date range</h4>
                <div class="input-icon date-inputs">
                    <span class="input-icon-addon">
                        <i class="ti ti-calendar-week"></i>
                    </span>
                    <input required class="form-control" placeholder="Select a date" id="date-input-${id}">
                </div>
            </div>
            <div>
                <h4 class="form-label">Select which days of the week this date range applies to</h4>
                <div class="day-selector btn-group" data-range-id="${id}">
                    <button type="button" class="day-button btn px-2.85!" data-day="Mon">Mon</button>
                    <button type="button" class="day-button btn px-2.85!" data-day="Tue">Tue</button>
                    <button type="button" class="day-button btn px-2.85!" data-day="Wed">Wed</button>
                    <button type="button" class="day-button btn px-2.85!" data-day="Thu">Thu</button>
                    <button type="button" class="day-button btn px-2.85!" data-day="Fri">Fri</button>
                    <button type="button" class="day-button btn px-2.75!" data-day="Sat">Sat</button>
                    <button type="button" class="day-button btn px-2.85!" data-day="Sun">Sun</button>
                </div>
            </div>
            <span class="remove-range cursor-pointer text-red-600 text-xl mt-5" data-range-id="${id}">
                <i class="ti ti-x"></i>
            </span>
        </div>
    `;
}

/**
 * Attaches event listeners for day buttons (toggling selection).
 */
function attachDayButtonListeners(groupElement) {
    groupElement.querySelectorAll('.day-button').forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('btn-success');
            button.classList.toggle('selected');
        });
    });
}
function attachRemoveRangeListener(groupElement) {
    const removeButton = groupElement.querySelector('.remove-range');

    if (removeButton) {
        removeButton.addEventListener('click', (event) => {
            const elementToRemove = event.currentTarget.closest('.date-range-group');
            if (elementToRemove) {
                elementToRemove.remove();
            }
        });
    }
}
function addDateRange() {
    rangeCount++;
    const newRangeHTML = createDateRangeHTML(rangeCount);
    const addRangeButton = document.getElementById('add-date-range');
    addRangeButton.insertAdjacentHTML('beforebegin', newRangeHTML);
    const newGroupElement = document.getElementById(`range-group-${rangeCount}`);

    attachDayButtonListeners(newGroupElement);
    attachRemoveRangeListener(newGroupElement);
    const dateInputId = `#date-input-${rangeCount}`;
    $(dateInputId).daterangepicker({
        autoUpdateInput: true,
        autoApply: true,
        locale: {
            format: 'MM/DD/YYYY'
        }
    });
}

// --- DOM Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    const initialRange = document.getElementById('range-group-1');
    
    if (initialRange) {
        // --- 1. Initialize daterangepicker for the first (static) range ---
        const initialDateInputId = `#date-input-1`;
        $(initialDateInputId).daterangepicker({
            // Initialize with the default date from the image
            startDate: '11/28/2025', 
            endDate: '12/13/2025',
            autoUpdateInput: true,
            autoApply: true,
            locale: {
                format: 'MM/DD/YYYY'
            }
        });
        
        // --- 2. Attach listeners for the first range ---
        attachDayButtonListeners(initialRange);
        attachRemoveRangeListener(initialRange); 
        
        // --- 3. Hide the remove button on the initial range (first element) ---
        const removeButton = initialRange.querySelector('.remove-range');
        if (removeButton) {
            // Using a class you define (e.g., Tailwind's 'hidden')
            removeButton.classList.add('opacity-0'); 
        }
    }
    
    // --- 4. Attach listener for the main "Add date range" button ---
    document.getElementById('add-date-range').addEventListener('click', addDateRange);
});