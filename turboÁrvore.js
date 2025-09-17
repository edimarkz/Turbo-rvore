(function() {
    'use strict';
    
    // Verifica se já está ativo para evitar duplicação
    if (window.turboArvoreActive) {
        alert('🌳 TurboÁrvore já está ativo nesta página!');
        return;
    }
    
    // Verifica se está na URL correta
    if (!window.location.href.includes('e-reader.arvore.com.br')) {
        alert('⚠ Este script só funciona dentro das Páginas dos Livros do Árvore!');
        return;
    }
    
    // Marca como ativo
    window.turboArvoreActive = true;

    // Cria o menu na página com design inspirado na Árvore
    function createMenu() {
        // Remove menu anterior se existir
        const existingMenu = document.getElementById('arvore-time-modifier');
        if (existingMenu) {
            existingMenu.remove();
        }

        // Cria o container principal
        const menuContainer = document.createElement('div');
        menuContainer.id = 'arvore-time-modifier';
        menuContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 300px;
            background: linear-gradient(135deg, #00D4AA 0%, #00B8A0 100%);
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0, 212, 170, 0.3);
            z-index: 10000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            overflow: hidden;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
        `;

        // Header do menu
        const header = document.createElement('div');
        header.style.cssText = `
            background: rgba(255, 255, 255, 0.1);
            padding: 16px 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;

        const title = document.createElement('h3');
        title.textContent = '🌳 TurboÁrvore Bookmarklet';
        title.style.cssText = `
            margin: 0;
            color: white;
            font-size: 16px;
            font-weight: 600;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        `;

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.id = 'close-btn';
        closeBtn.style.cssText = `
            background: rgba(255, 255, 255, 0.2);
            border: none;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            color: white;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        header.appendChild(title);
        header.appendChild(closeBtn);

        // Body do menu
        const body = document.createElement('div');
        body.id = 'menu-body';
        body.style.cssText = `
            padding: 20px;
        `;

        // Label para o input
        const label = document.createElement('label');
        label.textContent = 'Tempo de leitura (segundos)';
        label.style.cssText = `
            display: block;
            color: white;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 8px;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        `;

        // Container do input
        const inputContainer = document.createElement('div');
        inputContainer.style.cssText = `
            display: flex;
            gap: 10px;
            margin-bottom: 16px;
        `;

        // Input do tempo
        const timeInput = document.createElement('input');
        timeInput.type = 'number';
        timeInput.id = 'timeInput';
        timeInput.min = '1';
        timeInput.value = localStorage.getItem('customTimeSpent') || '300';
        timeInput.style.cssText = `
            flex: 1;
            padding: 12px;
            border: none;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.9);
            color: #333;
            font-size: 14px;
            font-weight: 500;
            outline: none;
            transition: all 0.2s ease;
        `;

        // Botão de enviar
        const setTimeBtn = document.createElement('button');
        setTimeBtn.id = 'setTimeBtn';
        setTimeBtn.innerHTML = '✓';
        setTimeBtn.style.cssText = `
            width: 44px;
            height: 44px;
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 8px;
            color: white;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        inputContainer.appendChild(timeInput);
        inputContainer.appendChild(setTimeBtn);

        // Status message
        const statusMessage = document.createElement('div');
        statusMessage.id = 'status-message';
        statusMessage.style.cssText = `
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            padding: 12px;
            color: white;
            font-size: 12px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.1);
        `;
        statusMessage.innerHTML = '💡 Defina o tempo e mude de página para testar';

        // Montagem do menu
        body.appendChild(label);
        body.appendChild(inputContainer);
        body.appendChild(statusMessage);

        menuContainer.appendChild(header);
        menuContainer.appendChild(body);

        document.body.appendChild(menuContainer);

        // Adiciona os event listeners
        addEventListeners(timeInput, setTimeBtn, closeBtn, statusMessage, menuContainer);

        // Adiciona efeitos hover
        addHoverEffects(menuContainer, setTimeBtn, closeBtn, timeInput);
    }

    // Adiciona event listeners
    function addEventListeners(timeInput, setTimeBtn, closeBtn, statusMessage, menuContainer) {
        // Botão de definir tempo
        setTimeBtn.addEventListener('click', () => {
            const newTime = parseInt(timeInput.value) || 300;
            localStorage.setItem('customTimeSpent', newTime);
            
            statusMessage.innerHTML = `✅ Tempo definido: ${newTime}s. Mude de página!`;
            statusMessage.style.background = 'rgba(76, 175, 80, 0.2)';
            statusMessage.style.borderColor = 'rgba(76, 175, 80, 0.3)';
            
            console.log('✅ TurboÁrvore: Tempo personalizado definido para:', newTime, 'segundos. Mude de página para enviar.');
            
            // Reset status após 3 segundos
            setTimeout(() => {
                statusMessage.innerHTML = '💡 Defina o tempo e mude de página para testar';
                statusMessage.style.background = 'rgba(255, 255, 255, 0.1)';
                statusMessage.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }, 3000);
        });

        // Botão de fechar
        closeBtn.addEventListener('click', () => {
            menuContainer.remove();
            window.turboArvoreActive = false;
        });

        // Enter no input
        timeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                setTimeBtn.click();
            }
        });
    }

    // Adiciona efeitos hover e animações
    function addHoverEffects(menuContainer, setTimeBtn, closeBtn, timeInput) {
        // Hover no container principal
        menuContainer.addEventListener('mouseenter', () => {
            menuContainer.style.transform = 'translateY(-2px)';
            menuContainer.style.boxShadow = '0 12px 40px rgba(0, 212, 170, 0.4)';
        });

        menuContainer.addEventListener('mouseleave', () => {
            menuContainer.style.transform = 'translateY(0)';
            menuContainer.style.boxShadow = '0 8px 32px rgba(0, 212, 170, 0.3)';
        });

        // Hover no botão de enviar
        setTimeBtn.addEventListener('mouseenter', () => {
            setTimeBtn.style.background = 'rgba(255, 255, 255, 0.3)';
            setTimeBtn.style.transform = 'scale(1.05)';
        });

        setTimeBtn.addEventListener('mouseleave', () => {
            setTimeBtn.style.background = '