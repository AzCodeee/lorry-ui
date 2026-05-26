document.addEventListener("DOMContentLoaded", function () {
    const settings = document.querySelector(".settings");
    const toggle = document.querySelector(".settings-toggle");

    toggle.addEventListener("click", function () {
        settings.classList.toggle("open");
    });
});{
  let table = new DataTable('.table', {
    responsive: true,
    ordering: false,
    dom: "<'top'f>t<'bottom'lip><'clear'>",
    language: {
      search: "",
      searchPlaceholder: "Search...",
      paginate: {
        previous: "<i class='ti ti-chevron-left'></i>",
        next: "<i class='ti ti-chevron-right'></i>"
      }
    }
  });
}
{
  document.querySelectorAll('.sidebar_toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('sidebar-hidden');
    });
  });
}
{
  // tel input
  var input = document.querySelector("#phone");
  if (input) {
    intlTelInput(input, {
      initialCountry: "my",
      separateDialCode: true,
      utilsScript: "assets/js/utils.js",
    });
  }
}
if ($('.search-select').length > 0) {
  $('.search-select').each(function () {

    const $select = $(this);
    const $parentOffcanvas = $select.closest('.offcanvas');

    $select.select2({
      placeholder: '--Select--',
      minimumResultsForSearch: 0,
      dropdownParent: $parentOffcanvas.length ? $parentOffcanvas : $('body')
    });

  });
}
{
  const selects = document.querySelectorAll(".specialCategory");
  if (selects.length) {
    selects.forEach(select => {
      select.addEventListener("change", function () {
        const value = this.value;
        document.querySelectorAll("[data-id]").forEach(div => {
          div.classList.add("hidden");
          if (div.getAttribute("data-id") === value) {
            div.classList.remove("hidden");
          }
        });
      });
    });
  }
}

{
  const selects = document.querySelectorAll(".specialCategory2");
  if (selects.length) {
    selects.forEach(select => {
      select.addEventListener("change", function () {
        const value = this.value;
        document.querySelectorAll("[data-id2]").forEach(div => {
          div.classList.add("hidden");
          if (div.getAttribute("data-id2") === value) {
            div.classList.remove("hidden");
          }
        });
      });
    });
  }
}
{
  const selects = document.querySelectorAll(".specialCategory3");
  if (selects.length) {
    selects.forEach(select => {
      select.addEventListener("change", function () {
        const value = this.value;
        document.querySelectorAll("[data-id3]").forEach(div => {
          div.classList.add("hidden");
          if (div.getAttribute("data-id3") === value) {
            div.classList.remove("hidden");
          }
        });
      });
    });
  }
}

{
  const selects = document.querySelectorAll(".specialCategory4");
  if (selects.length) {
    selects.forEach(select => {
      select.addEventListener("change", function () {
        const value = this.value;
        document.querySelectorAll("[data-id4]").forEach(div => {
          div.classList.add("hidden");
          if (div.getAttribute("data-id4") === value) {
            div.classList.remove("hidden");
          }
        });
      });
    });
  }
}


{
  const textEditor = document.getElementById("textEditor");
  if (textEditor) {
    document.addEventListener("DOMContentLoaded", function () {
      let options = {
        selector: '#textEditor',
        height: 300,
        menubar: false,
        statusbar: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
          'preview', 'anchor',
          'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat',
        content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; -webkit-font-smoothing: antialiased; }'
      }
      if (localStorage.getItem("tablerTheme") === 'dark') {
        options.skin = 'oxide-dark';
        options.content_css = 'dark';
      }
      hugeRTE.init(options);
    });
  }
}
{
  $('.upload-box').each(function () {
    let box = $(this),
      input = box.find('input[type=file]'),
      counter = box.find('p');

    // Click to select
    box.on('click', function (e) {
      if (!$(e.target).is('input[type=file]')) {
        input.trigger('click');
      }
    });

    // File input change
    input.on('change', () => counter.text(input[0].files.length + ' files selected'));

    // Drag over
    box.on('dragover', e => { e.preventDefault(); box.css('background', '#eef'); });

    // Drag leave / drop
    box.on('dragleave drop', e => { e.preventDefault(); box.css('background', ''); });

    // Drop files
    box.on('drop', e => {
      let files = e.originalEvent.dataTransfer.files;
      counter.text(files.length + ' files selected');
    });
  });
}

{
  class TagInput {
  constructor(input) {
    this.input = input;
    this.tags = [];
    this.suggestions = (input.dataset.suggestions || "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    // Wrap input
    this.wrapper = document.createElement("div");
    this.wrapper.className = "tag-box";
    input.parentNode.insertBefore(this.wrapper, input);
    this.wrapper.appendChild(input);

    // Suggestion box
    this.suggestionBox = document.createElement("div");
    this.suggestionBox.className = "suggestion-list";
    this.wrapper.appendChild(this.suggestionBox);

    this.bindEvents();
    this.setDefaultTags(); // 👈 NEW
  }

  bindEvents() {
    this.input.addEventListener("focus", () => this.showSuggestions(""));

    this.input.addEventListener("keyup", (e) => {
      const value = this.input.value.trim();

      if (e.key === "Enter" && value) {
        this.addTag(value);
        this.input.value = "";
        this.hideSuggestions();
      } else {
        this.showSuggestions(value);
      }
    });

    document.addEventListener("click", (e) => {
      if (!this.wrapper.contains(e.target)) {
        this.hideSuggestions();
      }
    });
  }

  setDefaultTags() {
    const values = this.input.value
      .split(",")
      .map(v => v.trim())
      .filter(Boolean);

    values.forEach(tag => this.addTag(tag));
    this.input.value = "";
  }

  addTag(tag) {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);

      const tagEl = document.createElement("span");
      tagEl.className = "tag-item";
      tagEl.textContent = tag;

      const close = document.createElement("span");
      close.className = "close";
      close.textContent = "×";
      close.onclick = () => this.removeTag(tag);

      tagEl.appendChild(close);
      this.wrapper.insertBefore(tagEl, this.input);
    }
  }

  removeTag(tag) {
    this.tags = this.tags.filter(t => t !== tag);
    this.renderTags();
  }

  renderTags() {
    this.wrapper.querySelectorAll(".tag-item").forEach(el => el.remove());
    this.tags.forEach(tag => this.addTag(tag));
  }

  showSuggestions(query) {
    const matches = this.suggestions.filter(item =>
      item.toLowerCase().includes(query.toLowerCase()) &&
      !this.tags.includes(item)
    );

    if (!matches.length) {
      this.hideSuggestions();
      return;
    }

    this.suggestionBox.innerHTML = "";
    matches.forEach(item => {
      const option = document.createElement("div");
      option.textContent = item;
      option.onclick = () => {
        this.addTag(item);
        this.input.value = "";
        this.hideSuggestions();
        this.input.focus();
      };
      this.suggestionBox.appendChild(option);
    });

    this.suggestionBox.style.display = "block";
  }

  hideSuggestions() {
    this.suggestionBox.style.display = "none";
  }
}

// Init
document.querySelectorAll(".tag-input").forEach(
  input => new TagInput(input)
);
}

// search
{
  document.querySelectorAll(".search_group").forEach(group => {
    const input = group.querySelector("input");
    const button = group.querySelector("button");
    const searchTable = document.getElementById("search_table");

    button.addEventListener("click", () => {
      if (input.value.trim() !== "") {
        searchTable.classList.remove("hidden");
      } else {
        searchTable.classList.add("hidden");
      }
    });
  });
}

// step form
{
  const form = document.getElementById("multiStepForm");
  if (form) {
    let currentStep = 0;
    const steps = document.querySelectorAll(".step_item");
    const nextBtn = document.getElementById("nextBtn");
    const nextWrap = document.getElementById("buttonWrap");
    let thank = document.querySelector(".thank_you");

    function showStep(index) {
      steps.forEach((step, i) => {
        step.classList.toggle("hidden", i !== index);
      });

      if (index === steps.length - 1) {
        nextBtn.textContent = "Send Now";
        nextBtn.dataset.submit = "true";
      } else {
        nextBtn.textContent = "Save & Next";
        delete nextBtn.dataset.submit;
      }
    }

    nextBtn.addEventListener("click", () => {
      if (nextBtn.dataset.submit) {
        form.requestSubmit();
        return;
      }

      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      nextWrap.remove();
      steps.forEach(step => step.classList.add("hidden"));
      thank.classList.remove('hidden');
    });

    showStep(currentStep);
  }
}

{
  // --- Remove customization ---
  function removeCustom(button) {
    button.closest(".customization").remove();
  }
  window.removeCustom = removeCustom;

  // --- Remove choice ---
  function removeChoice(button) {
    button.closest(".choice_box").remove();
  }
  window.removeChoice = removeChoice;

  // --- Initialize one customization ---
  function initCustomization(item) {
    let requirementSelect = item.querySelector(".requirement");
    let typeSelect = item.querySelector(".type");
    let minMaxContainer = item.querySelector(".minMaxContainer");
    let minInput = minMaxContainer.querySelector(".min");
    let maxInput = minMaxContainer.querySelector(".max");

    let requireValue = '';
    let typeValue = '';

    function toggleMinMax() {
      if (requireValue && typeValue) {
        minMaxContainer.classList.remove("hidden");

        if (requireValue === 'Required' && typeValue === 'Select 1 only') {
          minInput.setAttribute("disabled", "true");
          maxInput.setAttribute("disabled", "true");
        } else if (requireValue === 'Optional' && typeValue === 'Select 1 only') {
          minInput.setAttribute("disabled", "true");
          maxInput.setAttribute("disabled", "true");
          minInput.value = 0;
        } else if (requireValue === 'Required' && typeValue === 'Select more than 1') {
          minInput.value = 1;
        } else {
          minInput.removeAttribute("disabled");
          maxInput.removeAttribute("disabled");
        }
      } else {
        minMaxContainer.classList.add("hidden");
      }
    }

    requirementSelect.addEventListener('change', (e) => {
      requireValue = e.target.value;
      toggleMinMax();
    });

    typeSelect.addEventListener('change', (e) => {
      typeValue = e.target.value;
      toggleMinMax();
    });

    toggleMinMax();

    // --- Add Choice button ---
    let addChoiceBtn = item.querySelector(".addChoice");
    let choiceWrap = item.querySelector(".choice_wrapper");

    addChoiceBtn.addEventListener('click', () => {
      let index = choiceWrap.querySelectorAll(".choice_box").length + 1;

      let choiceTemplate = `
        <div class="choice_box relative bg-gray-100 pt-1 px-4 pb-4 mb-3">
          <button type="button" class="btn btn-danger btn-sm absolute! right-0 top-0 delete_btn" onclick="removeChoice(this)">
            <i class="ti ti-trash text-lg"></i>
          </button>
          <div class="flex flex-wrap -mx-2.5">
            <div class="w-12/12 md:w-6/12 mt-3 px-2.5">
              <label class="form-label">Choice ${index}</label>
              <input type="text" class="form-control" />
            </div>
            <div class="w-12/12 md:w-6/12 mt-3 px-2.5">
              <label class="form-label">Type <span class="text-red-500">*</span></label>
              <select class="form-select priceToggle">
                <option selected="selected" value="">--Select--</option>
                <option value="Include in the Price">Include in the Price</option>
                <option value="Additional">Additional (+)</option>
                <option value="Deduct">Deduct (-)</option>
              </select>
            </div>
            <div class="w-12/12 md:w-12/12 mt-3 px-2.5 hidden price">
              <label class="form-label">Price <span class="text-red-500">*</span></label>
              <div class="input-group">
                <span class="input-group-text">RM</span>
                <input type="number" class="form-control" placeholder="0" />
                <span class="input-group-text">per unit</span>
              </div>
            </div>
          </div>
        </div>`;
      choiceWrap.insertAdjacentHTML('beforeend', choiceTemplate);
    });

    // --- Price Toggle inside choices ---
    item.addEventListener('change', (e) => {
      if (e.target.classList.contains('priceToggle')) {
        let choiceCard = e.target.closest('.choice_box');
        let priceDiv = choiceCard.querySelector('.price');

        if (e.target.value) {
          priceDiv.classList.remove('hidden');
        } else {
          priceDiv.classList.add('hidden');
        }

        if (e.target.value === 'Include in the Price') {
          priceDiv.querySelector("input").setAttribute("disabled", "true");
        } else {
          priceDiv.querySelector("input").removeAttribute("disabled");
        }
      }
    });
  }

  // --- Initialize all existing customizations ---
  document.querySelectorAll('.customization').forEach(initCustomization);

  // --- Add Customization button ---
  let customWrapper = document.querySelector('.customization_wrapper');
  let customBtn = document.querySelector('.addCustomization');
  if(customBtn){
    customBtn.addEventListener('click', () => {
      let index = customWrapper.querySelectorAll('.customization').length + 1;

      let customTemplate = `
        <div class="customization relative border-t border-gray-200 group pt-3 mt-4 first:border-0 first:pt-0!">
          <h3 class="mb-0">Customization ${index}</h3>
          <button type="button" class="btn btn-danger hidden! group-last:inline-flex! btn-sm absolute! right-0 top-4 delete_custom" onclick="removeCustom(this)">
            <i class="ti ti-trash text-lg"></i>
          </button>
          <div class="flex flex-wrap -mx-2.5">
            <div class="w-12/12 md:w-12/12 mt-3 px-2.5">
              <label class="form-label">Name <span class="text-red-500">*</span></label>
              <input type="text" class="form-control" placeholder="E.g. Extra Topping" />
            </div>
            <div class="w-12/12 md:w-6/12 mt-3 px-2.5">
              <label class="form-label">Selection Requirement <span class="text-red-500">*</span></label>
              <select class="form-select requirement">
                <option selected="selected" value="">--Select--</option>
                <option value="Required">Required</option>
                <option value="Optional">Optional</option>
              </select>
            </div>
            <div class="w-12/12 md:w-6/12 mt-3 px-2.5">
              <label class="form-label">Selection Type <span class="text-red-500">*</span></label>
              <select class="form-select type">
                <option selected="selected" value="">--Select--</option>
                <option value="Select 1 only">Select 1 only</option>
                <option value="Select more than 1">Select more than 1</option>
              </select>
            </div>
            <div class="w-12/12 px-2.5 hidden minMaxContainer">
              <div class="flex flex-wrap -mx-2.5">
                <div class="w-12/12 md:w-6/12 mt-3 px-2.5">
                  <label class="form-label">Min <span class="text-red-500">*</span></label>
                  <input type="text" class="form-control min" value="1" />
                </div>
                <div class="w-12/12 md:w-6/12 mt-3 px-2.5">
                  <label class="form-label">Max <span class="text-red-500">*</span></label>
                  <input type="text" class="form-control max" value="1" />
                </div>
              </div>
            </div>
            <div class="w-12/12 md:w-12/12 mt-3 px-2.5">
              <label class="form-label">Choices</label>
              <div class="choice_wrapper">
                <div class="choice_box relative bg-gray-100 pt-1 px-4 pb-4 mb-3">
                  <div class="flex flex-wrap -mx-2.5">
                    <div class="w-12/12 md:w-6/12 mt-3 px-2.5">
                      <label class="form-label">Choice 1</label>
                      <input type="text" class="form-control" />
                    </div>
                    <div class="w-12/12 md:w-6/12 mt-3 px-2.5">
                      <label class="form-label">Type <span class="text-red-500">*</span></label>
                      <select class="form-select priceToggle">
                        <option selected="selected" value="">--Select--</option>
                        <option value="Include in the Price">Include in the Price</option>
                        <option value="Additional">Additional (+)</option>
                        <option value="Deduct">Deduct (-)</option>
                      </select>
                    </div>
                    <div class="w-12/12 md:w-12/12 mt-3 px-2.5 hidden price">
                      <label class="form-label">Price <span class="text-red-500">*</span></label>
                      <div class="input-group">
                        <span class="input-group-text">RM</span>
                        <input type="number" class="form-control" placeholder="0" />
                        <span class="input-group-text">per unit</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button type="button" class="btn btn-info btn-sm addChoice">Add Choice</button>
            </div>
          </div>
        </div>
      `;

      customWrapper.insertAdjacentHTML('beforeend', customTemplate);

      let newItem = customWrapper.querySelector('.customization:last-child');
      initCustomization(newItem);

      if (index >= 12) {
        customBtn.classList.add('!hidden');
      } else {
        customBtn.classList.remove('!hidden');
      }
    });
  }
}


document.addEventListener('DOMContentLoaded', () => {
    const activeIds = new Set();

    document.body.addEventListener('click', (event) => {
        const trigger = event.target.closest('[data-open]');
        const closeBtn = event.target.closest('.close-offcanvas');

        // === OPEN OFFCANVAS ===
        if (trigger) {
            const targetId = trigger.getAttribute('data-open');
            const targetEl = document.querySelector(targetId);
            if (!targetEl) return;

            // Show the offcanvas
            targetEl.classList.add('show');

            // Check if a backdrop already exists for this offcanvas
            let backdrop = document.querySelector(`.offcanvas-backdrop-custom[data-target="${targetId}"]`);

            // If not, create it
            if (!backdrop) {
                // Find next available ID
                let idNumber = 1;
                while (activeIds.has(idNumber)) idNumber++;
                activeIds.add(idNumber);

                const backdropId = `offcanvas-backdrop-${idNumber}`;

                backdrop = document.createElement('div');
                backdrop.className = 'offcanvas-backdrop-custom';
                backdrop.id = backdropId;
                backdrop.dataset.target = targetId;
                document.body.appendChild(backdrop);

                // Fade-in
                requestAnimationFrame(() => backdrop.classList.add('show'));

                // Close when clicking backdrop
                backdrop.addEventListener('click', () => closeOffcanvas(targetEl, backdrop, idNumber));
            }

            // Add close button listeners inside this offcanvas
            const buttons = targetEl.querySelectorAll('.close-offcanvas');
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const idNumber = parseInt(backdrop.id.split('-').pop());
                    closeOffcanvas(targetEl, backdrop, idNumber);
                });
            });
        }

        // === CLOSE OFFCANVAS via .close-offcanvas (delegated) ===
        if (closeBtn) {
            const offcanvas = closeBtn.closest('.offcanvas');
            if (!offcanvas) return;

            const backdrop = document.querySelector(`.offcanvas-backdrop-custom[data-target="#${offcanvas.id}"]`);
            if (!backdrop) return;

            const idNumber = parseInt(backdrop.id.split('-').pop());
            closeOffcanvas(offcanvas, backdrop, idNumber);
        }
    });

    // === Reusable close function ===
    function closeOffcanvas(offcanvas, backdrop, idNumber) {
        if (!offcanvas || !backdrop) return;

        offcanvas.classList.remove('show');
        backdrop.classList.remove('show');

        backdrop.addEventListener(
            'transitionend',
            () => {
                backdrop.remove();
                activeIds.delete(idNumber);
            },
            { once: true }
        );
    }
});




{
  const checkbox = document.getElementById('notApplicable');
  const select = document.getElementById('statusSelect');
  if(checkbox){
    checkbox.addEventListener('change', function () {
      select.disabled = this.checked;
    });
  }
}

{
document.addEventListener("click", function (e) {
    const addon = e.target.closest(".copy");
    if (!addon) return;

    const input = addon.closest(".input-icon")?.querySelector("a");
    if (!input) return;

    if (!navigator.clipboard) {
        // Fallback for older browsers
        input.select();
        document.execCommand("copy");
        return;
    }

    navigator.clipboard.writeText(input.text)
        .then()
        .catch(err => {
            console.error("Copy failed", err);
        });
});

}