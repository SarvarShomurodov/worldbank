document.querySelectorAll(".text-content").forEach(paragraph => {
    const fullText = paragraph.getAttribute("data-fulltext"); // Ma'lumot olish
    const maxLength = 150; // Cheklangan uzunlik

    // Elementlarni topish
    const shortTextEl = paragraph.querySelector(".short-text");
    const hiddenTextEl = paragraph.querySelector(".hidden-text");
    const dotsEl = paragraph.querySelector(".dots");
    const showMoreEl = paragraph.querySelector(".show-more");

    // Matnni qisqartirish
    if (fullText.length > maxLength) {
        let trimmedText = fullText.substring(0, maxLength);
        let lastSpace = trimmedText.lastIndexOf(" ");
        if (lastSpace !== -1) {
            trimmedText = trimmedText.substring(0, lastSpace);
        }
        shortTextEl.textContent = trimmedText; // Qisqa matn
        hiddenTextEl.textContent = fullText.substring(trimmedText.length); // Yashirin matn
    } else {
        shortTextEl.textContent = fullText;
        dotsEl.style.display = "none";
        showMoreEl.style.display = "none";
    }

    // "Ko‘proq ko‘rish" tugmasi bosilganda ishlov berish
    showMoreEl.addEventListener("click", () => {
        if (hiddenTextEl.style.display === "none") {
            hiddenTextEl.style.display = "inline";
            dotsEl.style.display = "none"; // 3 ta nuqta yashirish
            showMoreEl.textContent = "Камроқ кўриш -";
        } else {
            hiddenTextEl.style.display = "none";
            dotsEl.style.display = "inline"; // 3 ta nuqta qayta ko‘rsatish
            showMoreEl.textContent = "Кўпроқ кўриш +";
        }
    });
});

function filterBazalar() {
    let checkedBazalar = [];
    document.querySelectorAll('.baza-checkbox:checked').forEach((checkbox) => {
        checkedBazalar.push(checkbox.value);
    });

    if (checkedBazalar.length === 0) {
        alert("Iltimos, kamida bitta bazani tanlang!");
    } else {
        console.log("Tanlangan bazalar:", checkedBazalar);
        alert("Tanlangan bazalar: " + checkedBazalar.join(", "));
    }
}

function setActive(clickedButton, sectionId) {
    // Barcha tugmalardan 'active' klassini olib tashlash
    document.querySelectorAll('.btn-custom').forEach(btn => {
        btn.classList.remove('active');
    });

    // Bosilgan tugmaga 'active' klassini qo'shish
    clickedButton.classList.add('active');

    // Barcha section-header'larni yashirish
    document.querySelectorAll('.section-header').forEach(section => {
        section.classList.remove('active');
    });

    // Faol section-header'ni ko‘rsatish
    document.getElementById(sectionId).classList.add('active');
}
document.getElementById('download-jpg').addEventListener('click', function(event) {
    event.preventDefault(); // Hrefni ishlatmaslik uchun
    downloadImage('jpg');
});

document.getElementById('download-png').addEventListener('click', function(event) {
    event.preventDefault(); // Hrefni ishlatmaslik uchun
    downloadImage('png');
});

function downloadImage(format) {
    var section = document.getElementById('section-table');
    
    html2canvas(section).then(function(canvas) {
        var link = document.createElement('a');
        if (format === 'jpg') {
            link.href = canvas.toDataURL('image/jpeg', 1.0); // JPG format
            link.download = 'jadval.jpg';
        } else if (format === 'png') {
            link.href = canvas.toDataURL('image/png'); // PNG format
            link.download = 'jadval.png';
        }
        link.click();
    });
}

