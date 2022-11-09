const INPUT_DRIVE_LINK = document.querySelector("#driveLink");
const OUTPUT_DRIVE_LINK = document.querySelector("#driveLinkResult");
const GEN_DRIVE_BTN = document.querySelector("#genResDriveLink");
const CLEAN_DRIVE_BTN = document.querySelector("#cleanDriveField");
const COPY_DRIVE_BTN = document.querySelector("#copyResDriveLink");
const BLOCK = document.querySelector('.linkbuilder__container');

GEN_DRIVE_BTN.addEventListener("click", generateDriveLink);
CLEAN_DRIVE_BTN.addEventListener("click", cleanDriveLink);
COPY_DRIVE_BTN.addEventListener("click", copyDriveLink);

function generateDriveLink(e) {
  const btn = e.target;
  if (INPUT_DRIVE_LINK.validity.valid) {
    const linkId = getIdFromUrl(INPUT_DRIVE_LINK.value);
    const link = `https://drive.google.com/uc?export=download&id=${linkId}`;
    OUTPUT_DRIVE_LINK.value = link;
    scrollToResult();
  } else {
    showErrorButtonText(btn);
  }
}

function getIdFromUrl(url) {
  return url.match(/[-\w]{25,}(?!.*[-\w]{25,})/)[0];
}

function cleanDriveLink() {
  INPUT_DRIVE_LINK.value = "";
}

function copyDriveLink(e) {
  const link = OUTPUT_DRIVE_LINK.value.trim();
  if (link) {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        if (e.target.innerText !== "Скопировано!") {
          const originalText = e.target.innerText;
          e.target.innerText = "Скопировано!";
          setTimeout(() => {
            e.target.innerText = originalText;
          }, 1500);
        }
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }
}

function showErrorButtonText(btn) {
  if (btn.innerText !== "Кривая ссылка") {
    const originalText = btn.innerText;
    btn.innerText = "Кривая ссылка!";
    setTimeout(() => {
      btn.innerText = originalText;
    }, 1500);
  }
}

function scrollToResult() {
  if (window.innerWidth < 961) {
    BLOCK.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }
}
