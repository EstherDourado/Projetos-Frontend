const platesData = [
    { id: 1, src: "img/elena-leya.jpg", alt: "macarrão", name: "Macarrão ao Molho Vermelho" },
    { id: 2, src: "img/espaguete.jpg", alt: "espaguete", name: "Espaguete à Bolonhesa" },
    { id: 3, src: "img/frango.jpg", alt: "frango", name: "Frango à Parmegiana" },
    { id: 4, src: "img/mexidao.jpg", alt: "mexidao", name: "Mexe-dão" },
    { id: 5, src: "img/salada.jpg", alt: "salada", name: "Salada Caesar" },
    { id: 6, src: "img/sofia-ciravegna.jpg", alt: "sofia ciravegna", name: "Sofia Ciravegna" },
    { id: 7, src: "img/macarrao-molhoverde.jpg", alt: "macarrão molho verde", name: "Macarrão ao Molho Verde" },
    { id: 8, src: "img/olayinka-babalola.jpg", alt: "olayinka babalola", name: "Olayinka Babalola" }
];

let currentSelectedPlateId = 1; // Guarda qual prato está selecionado no centro
let trackingInterval; // Variável para controlar a simulação do tempo de entrega

// Lógica da TELA 1 (Home e Órbita) 
const radius = 275;

function renderOrbit() {
    const container = document.getElementById('platesContainer');
    container.innerHTML = ''; 

    platesData.forEach((plate, index) => {
        const step = 360 / platesData.length; 
        const finalAngle = index * step; 
        const radians = finalAngle * (Math.PI / 180);

        const x = Math.cos(radians) * radius;
        const y = Math.sin(radians) * radius;

        const plateWrapper = document.createElement('div');
        plateWrapper.className = 'small-plate-wrapper';
        plateWrapper.style.transform = `translate(${x}px, ${y}px)`;
        
        plateWrapper.innerHTML = `
            <div class="small-plate-counter-rotator">
                <div class="small-plate" onclick="selectPlate(${plate.id}, '${plate.src}')">
                    <img src="${plate.src}" alt="${plate.name}">
                </div>
            </div>
        `;
        
        container.appendChild(plateWrapper);
    });
}

function selectPlate(id, imageSrc) {
    currentSelectedPlateId = id; // Atualiza a memória de qual prato foi clicado
    const mainImg = document.getElementById('mainPlateImg');
    
    mainImg.style.transform = 'scale(0.5) rotate(-45deg)';
    mainImg.style.opacity = '0';
    
    setTimeout(() => {
        mainImg.src = imageSrc;
        mainImg.style.transform = 'scale(1) rotate(0deg)';
        mainImg.style.opacity = '1';
    }, 400); 
}

// Lógica da tela de pedido (Formulário e Catálogo)
function renderCatalogGrid() {
    const grid = document.getElementById('catalogGrid');
    grid.innerHTML = ''; // Limpa grid anterior
    
    platesData.forEach(plate => {
        const itemHTML = `
            <label class="catalog-item">
                <input type="radio" name="selectedDish" value="${plate.id}" required>
                <div class="catalog-card">
                    <img src="${plate.src}" alt="${plate.name}">
                    <div style="font-size: 0.85rem; color: #555; font-weight: 500;">${plate.name}</div>
                </div>
            </label>
        `;
        grid.innerHTML += itemHTML;
    });
}

// Lógica da tela de status (Simulação de Entrega)
function startTrackingSimulation() {
    // Reseta a barra de progresso
    const steps = [
        document.getElementById('step1'),
        document.getElementById('step2'),
        document.getElementById('step3'),
        document.getElementById('step4')
    ];
    
    steps.forEach(step => {
        step.classList.remove('active');
        step.classList.remove('completed');
    });
    
    // Começa no passo 1
    steps[0].classList.add('active');
    let currentStepIndex = 0;
    
    // Cancela se houver algum timer anterior rodando
    if(trackingInterval) clearInterval(trackingInterval);
    
    // Simula o pedido avançando a cada 3.5 segundos para efeito de demonstração
    trackingInterval = setInterval(() => {
        if(currentStepIndex < steps.length - 1) {
            steps[currentStepIndex].classList.remove('active');
            steps[currentStepIndex].classList.add('completed');
            
            currentStepIndex++;
            steps[currentStepIndex].classList.add('active');
        } else {
            steps[currentStepIndex].classList.remove('active');
            steps[currentStepIndex].classList.add('completed');
            clearInterval(trackingInterval); // Terminou a viagem
        }
    }, 3500); 
}

// Volta pro início resetando tudo
function resetApp() {
    document.getElementById('checkoutForm').reset();
    if(trackingInterval) clearInterval(trackingInterval);
    navigateTo('home.html');
}

// Inicializa a renderização da Home assim que carregar a página
window.onload = renderOrbit;