/*
  IMAGE MANIFEST
  --------------------------------------------------
  Add your images here.

  Example:
  {
    name: "Project Homepage",
    src: "images/projects/project-homepage.jpg",
    category: "projects"
  }

  The "src" is the same path you will use from your portfolio.
*/

const imageLibrary = [
  {
    name: "Pux",
    src: "images/branding/pux.png",
    category: "branding"
  },
  {
    name: "Asset Builders",
    src: "images/branding/ab.png",
    category: "branding"
  },
  {
    name: "Sport",
    src: "images/graphics/autoprogress.png",
    category: "graphics"
  },
  {
    name: "donate",
    src: "images/graphics/10.png",
    category: "graphics"
  },
{
  name: "food",
  src: "images/graphics/12.png",
  category: "graphics"
  },
  {
    name: "poster",
    src: "images/graphics/pux.jpg",
    category: "graphics"
  },
  {
    name: "poster",
    src: "images/graphics/Send. Confirm. Done..png",
    category: "graphics"  
  },
  {
    name: "flyer",
    src: "images/graphics/youth flyer nfm.png",
    category: "graphics"
  },
  {
    name: "fashion",
    src: "images/projects/fashion.jpeg",
    category: "projects"
  },
  {
    name: "poster",
    src: "images/projects/YOUTH NFM.png",
    category: "projects"
  },
  {
    name: "fashion",
    src: "images/projects/Her Own Beauty.png",
    category: "projects"
  },
  {
    name: "print",
    src: "images/projects/8.png",
    category: "branding"
  },
  {
    name: "poster",
    src: "images/projects/11.jpg",
    category: "graphics"
  },
  {
    name: "poster",
    src: "images/projects/dagracia.png",
    category: "graphics"
  },
  {
    name: "poster",
    src: "images/projects/give to live.png",
    category: "graphics"
  },
  {
    name: "poster",
    src: "images/graphics/auto.png",
    category: "graphics"
  },
  {
    name: "poster",
    src: "images/graphics/pot.png",
    category: "graphics"
  },
  {
    name: "poster",
    src: "images/graphics/weg.png",
    category: "graphics"
  },
  {
    name: "poster",
    src: "images/graphics/funny.png",
    category: "graphics"
  },
  {
    name: "poster",
    src: "images/graphics/zen.png",
    category: "graphics"
  },
  {
    name: "poster",
    src: "images/graphics/Be Your Own.png",
    category: "graphics"
  },
  {
    name: "poster",
    src: "images/projects/NFM.png",
    category: "projects"
  },
  {
    name: "print",
    src: "images/projects/O.png",
    category: "projects"
  },
  {
    name: "NFM",
    src: "images/ui-ux/nfm.png",
    category: "ui-ux"
  },
  {
    name: "mobile",
    src: "images/projects/mobile.png",
    category: "projects"
  },
  {
    name: "poster",
    src: "images/projects/Zetor Global 2175.png",
    category: "projects"
  },
  {
    name: "Agent4",
    src: "images/ui-ux/agent4.png",
    category: "ui-ux"
  },
  {
    name: "mercan",
    src: "images/ui-ux/Component 16.png",
    category: "ui-ux"
  },
  {
    name: "gocart",
    src: "images/ui-ux/gocart.png",
    category: "ui-ux"
  }
];

const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("searchInput");
const filters = document.getElementById("filters");
const imageCount = document.getElementById("imageCount");
const emptyState = document.getElementById("emptyState");

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalPath = document.getElementById("modalPath");
const modalClose = document.getElementById("modalClose");
const modalBackdrop = document.getElementById("modalBackdrop");
const copyPath = document.getElementById("copyPath");
const openImage = document.getElementById("openImage");
const toast = document.getElementById("toast");
const themeToggle = document.getElementById("themeToggle");

let activeCategory = "all";
let selectedImage = null;

function getCategories() {
  return [...new Set(imageLibrary.map(image => image.category).filter(Boolean))].sort();
}

function buildFilters() {
  const categories = getCategories();

  filters.innerHTML = `
    <button class="filter active" data-category="all">All</button>
    ${categories.map(category => `
      <button class="filter" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>
    `).join("")}
  `;

  filters.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;

      filters.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
      button.classList.add("active");

      render();
    });
  });
}

function render() {
  const search = searchInput.value.trim().toLowerCase();

  const results = imageLibrary.filter(image => {
    const matchesCategory =
      activeCategory === "all" || image.category === activeCategory;

    const matchesSearch =
      !search ||
      image.name.toLowerCase().includes(search) ||
      image.src.toLowerCase().includes(search) ||
      image.category.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  imageCount.textContent = results.length;
  gallery.innerHTML = "";

  emptyState.hidden = results.length !== 0;

  results.forEach(image => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <div class="card-image">
        <img src="${escapeAttribute(image.src)}"
             alt="${escapeAttribute(image.name)}"
             loading="lazy"
             onerror="this.style.opacity='0.2'">
      </div>
      <div class="card-body">
        <h3 class="card-name" title="${escapeAttribute(image.name)}">
          ${escapeHtml(image.name)}
        </h3>
        <div class="card-meta">
          <span class="category">${escapeHtml(image.category)}</span>
          <button class="preview-button">Preview →</button>
        </div>
      </div>
    `;

    card.querySelector(".preview-button").addEventListener("click", () => {
      openModal(image);
    });

    card.querySelector(".card-image").addEventListener("click", () => {
      openModal(image);
    });

    gallery.appendChild(card);
  });
}

function openModal(image) {
  selectedImage = image;

  modalImage.src = image.src;
  modalImage.alt = image.name;
  modalTitle.textContent = image.name;
  modalCategory.textContent = image.category;
  modalPath.textContent = image.src;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

async function copyImagePath() {
  if (!selectedImage) return;

  const path = selectedImage.src;
  const absoluteUrl = new URL(path, window.location.href).href;

  try {
    await navigator.clipboard.writeText(absoluteUrl);
    showToast("Image URL copied");
  } catch {
    const temp = document.createElement("textarea");
    temp.value = absoluteUrl;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    temp.remove();
    showToast("Image URL copied");
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

searchInput.addEventListener("input", render);
modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);
copyPath.addEventListener("click", copyImagePath);

openImage.addEventListener("click", () => {
  if (selectedImage) {
    window.open(selectedImage.src, "_blank", "noopener,noreferrer");
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

const savedTheme = localStorage.getItem("image-library-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  localStorage.setItem(
    "image-library-theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});

buildFilters();
render();
