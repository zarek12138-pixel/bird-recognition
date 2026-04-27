// 鸟类叫声识别系统 - 前端逻辑

// ==================== 鸟类数据库 ====================
const birdsDatabase = [
    {
        id: 1,
        name: "麻雀",
        scientificName: "Passer domesticus",
        category: "songbird",
        description: "最常见的城市鸟类之一，体型小巧，叫声清脆悦耳，喜欢群居。",
        tags: ["常见", "城市", "群居"],
        image: "https://images.unsplash.com/photo-1552728089-57bdde30beb8?w=400"
    },
    {
        id: 2,
        name: "喜鹊",
        scientificName: "Pica pica",
        category: "songbird",
        description: "黑白相间的羽毛，尾巴修长，叫声洪亮，在中国文化中象征吉祥。",
        tags: ["吉祥", "聪明", "黑白"],
        image: "https://images.unsplash.com/photo-1552728089-57bdde30beb8?w=400"
    },
    {
        id: 3,
        name: "布谷鸟",
        scientificName: "Cuculus canorus",
        category: "songbird",
        description: "以独特的"布谷"叫声闻名，是春天的使者，具有巢寄生的习性。",
        tags: ["春鸟", "寄生", "独特叫声"],
        image: "https://images.unsplash.com/photo-1552728089-57bdde30beb8?w=400"
    },
    {
        id: 4,
        name: "啄木鸟",
        scientificName: "Picidae",
        category: "woodpecker",
        description: "以快速啄木的声音著称，是森林的医生，帮助树木去除害虫。",
        tags: ["森林医生", "啄木声", "益鸟"],
        image: "https://images.unsplash.com/photo-1552728089-57bdde30beb8?w=400"
    },
    {
        id: 5,
        name: "燕子",
        scientificName: "Hirundo rustica",
        category: "songbird",
        description: "飞行技巧高超，尾巴分叉，是益鸟，以昆虫为食，常在屋檐下筑巢。",
        tags: ["飞行高手", "益鸟", "迁徙"],
        image: "https://images.unsplash.com/photo-1552728089-57bdde30beb8?w=400"
    },
    {
        id: 6,
        name: "白头鹎",
        scientificName: "Pycnonotus sinensis",
        category: "songbird",
        description: "头顶白色，叫声多变悦耳，是常见的城市鸟类，又称"白头翁"。",
        tags: ["城市", "白头", "鸣叫"],
        image: "https://images.unsplash.com/photo-1552728089-57bdde30beb8?w=400"
    },
    {
        id: 7,
        name: "白鹭",
        scientificName: "Egretta garzetta",
        category: "water",
        description: "全身洁白，姿态优雅，常在湿地、水田觅食，是湿地生态的重要指标物种。",
        tags: ["优雅", "白色", "湿地"],
        image: "https://images.unsplash.com/photo-1552728089-57bdde30beb8?w=400"
    },
    {
        id: 8,
        name: "翠鸟",
        scientificName: "Alcedo atthis",
        category: "water",
        description: "羽毛鲜艳，以蓝色和橙色为主，擅长捕鱼，飞行迅速如箭。",
        tags: ["鲜艳", "捕鱼", "快速"],
        image: "https://images.unsplash.com/photo-1552728089-57bdde30beb8?w=400"
    },
    {
        id: 9,
        name: "老鹰",
        scientificName: "Accipitridae",
        category: "raptor",
        description: "猛禽之王，视力敏锐，飞行能力极强，象征力量和自由。",
        tags: ["猛禽", "力量", "高空"],
        image: "https://images.unsplash.com/photo-1552728089-57bdde30beb8?w=400"
    },
    {
        id: 10,
        name: "夜莺",
        scientificName: "Luscinia megarhynchos",
        category: "songbird",
        description: "以美妙的歌声闻名，夜间鸣叫尤为动听，是诗人们喜爱的题材。",
        tags: ["歌王", "夜间", "美妙"],
        image: "https://images.unsplash.com/photo-1552728089-57bdde30beb8?w=400"
    },
    {
        id: 11,
        name: "乌鸦",
        scientificName: "Corvus",
        category: "songbird",
        description: "全身黑色，智商极高，能够使用工具，叫声沙哑有辨识度。",
        tags: ["聪明", "黑色", "工具使用"],
        image: "https://images.unsplash.com/photo-1552728089-57bdde30beb8?w=400"
    },
    {
        id: 12,
        name: "黄鹂",
        scientificName: "Oriolus chinensis",
        category: "songbird",
        description: "羽毛金黄与黑色相间，叫声清脆婉转，是中国传统名鸟。",
        tags: ["金黄", "婉转", "名鸟"],
        image: "https://images.unsplash.com/photo-1552728089-57bdde30beb8?w=400"
    }
];

// ==================== DOM 元素 ====================
const uploadArea = document.getElementById('uploadArea');
const audioInput = document.getElementById('audioInput');
const recordBtn = document.getElementById('recordBtn');
const recordingIndicator = document.getElementById('recordingIndicator');
const recordTime = document.getElementById('recordTime');
const audioPreview = document.getElementById('audioPreview');
const audioPlayer = document.getElementById('audioPlayer');
const fileName = document.getElementById('fileName');
const removeAudioBtn = document.getElementById('removeAudio');
const recognizeBtn = document.getElementById('recognizeBtn');
const loadingState = document.getElementById('loadingState');
const resultContainer = document.getElementById('resultContainer');
const birdsGrid = document.getElementById('birdsGrid');

// ==================== 全局变量 ====================
let mediaRecorder = null;
let audioChunks = [];
let recordingStartTime = null;
let recordingTimer = null;
let currentAudioBlob = null;

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('页面加载完成，开始初始化...');
    initBirdsGrid();
    initEventListeners();
    initSmoothScroll();
    console.log('初始化完成');
});

// ==================== 事件监听 ====================
function initEventListeners() {
    // 文件上传
    uploadArea.addEventListener('click', () => audioInput.click());
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    audioInput.addEventListener('change', handleFileSelect);

    // 录音
    recordBtn.addEventListener('click', toggleRecording);

    // 移除音频
    removeAudioBtn.addEventListener('click', removeAudio);

    // 识别
    recognizeBtn.addEventListener('click', startRecognition);

    // 过滤器
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => filterBirds(btn.dataset.filter));
    });
}

// ==================== 文件上传 ====================
function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('audio/')) {
        processAudioFile(files[0]);
    }
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        processAudioFile(file);
    }
}

function processAudioFile(file) {
    currentAudioBlob = file;
    const url = URL.createObjectURL(file);
    audioPlayer.src = url;
    fileName.textContent = file.name;
    
    uploadArea.style.display = 'none';
    document.querySelector('.record-section').style.display = 'none';
    audioPreview.style.display = 'block';
    resultContainer.style.display = 'none';
}

function removeAudio() {
    currentAudioBlob = null;
    audioPlayer.src = '';
    audioInput.value = '';
    
    uploadArea.style.display = 'block';
    document.querySelector('.record-section').style.display = 'block';
    audioPreview.style.display = 'none';
    resultContainer.style.display = 'none';
}

// ==================== 录音功能 ====================
async function toggleRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        stopRecording();
    } else {
        await startRecording();
    }
}

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = (e) => {
            audioChunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            currentAudioBlob = audioBlob;
            const url = URL.createObjectURL(audioBlob);
            audioPlayer.src = url;
            fileName.textContent = `录音_${new Date().toLocaleTimeString()}.wav`;
            
            uploadArea.style.display = 'none';
            document.querySelector('.record-section').style.display = 'none';
            audioPreview.style.display = 'block';
            
            // 停止所有轨道
            stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        recordingStartTime = Date.now();
        
        // 更新 UI
        recordBtn.classList.add('recording');
        recordBtn.innerHTML = '<i class="fas fa-stop"></i><span>停止录音</span>';
        recordingIndicator.style.display = 'flex';
        
        // 开始计时
        recordingTimer = setInterval(updateRecordTime, 1000);
        
    } catch (err) {
        alert('无法访问麦克风，请检查权限设置');
        console.error('录音错误:', err);
    }
}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        clearInterval(recordingTimer);
        
        // 重置 UI
        recordBtn.classList.remove('recording');
        recordBtn.innerHTML = '<i class="fas fa-microphone"></i><span>点击录音</span>';
        recordingIndicator.style.display = 'none';
        recordTime.textContent = '0:00';
    }
}

function updateRecordTime() {
    const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    recordTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// ==================== 识别功能 ====================
async function startRecognition() {
    console.log('开始识别，音频文件:', currentAudioBlob);
    
    if (!currentAudioBlob) {
        alert('请先上传音频文件');
        return;
    }

    // 显示加载状态
    audioPreview.style.display = 'none';
    loadingState.style.display = 'block';
    resultContainer.style.display = 'none';

    try {
        // 创建 FormData
        const formData = new FormData();
        formData.append('audio', currentAudioBlob, 'audio.wav');

        console.log('正在发送请求到后端...');
        
        // 发送到后端 API
        const response = await fetch('http://localhost:8000/api/recognize', {
            method: 'POST',
            body: formData
        });

        console.log('收到响应:', response.status);

        if (!response.ok) {
            throw new Error(`识别失败: ${response.status}`);
        }

        const result = await response.json();
        console.log('识别结果:', result);
        displayResult(result);

    } catch (error) {
        console.error('识别错误:', error);
        // 如果后端不可用，使用模拟数据演示
        console.log('切换到模拟模式...');
        simulateRecognition();
    }
}

function simulateRecognition() {
    // 模拟识别延迟
    setTimeout(() => {
        // 随机选择一个鸟类作为结果
        const randomBird = birdsDatabase[Math.floor(Math.random() * birdsDatabase.length)];
        const confidence = Math.floor(Math.random() * 30) + 70; // 70-99%
        
        // 生成其他可能的结果
        const alternatives = birdsDatabase
            .filter(b => b.id !== randomBird.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map((bird, index) => ({
                ...bird,
                confidence: Math.floor(Math.random() * 20) + 50 - (index * 10)
            }));

        const result = {
            primary: {
                ...randomBird,
                confidence: confidence
            },
            alternatives: alternatives
        };

        displayResult(result);
    }, 2000);
}

function displayResult(result) {
    loadingState.style.display = 'none';
    resultContainer.style.display = 'block';

    const primary = result.primary;
    
    // 填充主要结果
    document.getElementById('resultImage').src = primary.image;
    document.getElementById('birdName').textContent = primary.name;
    document.getElementById('scientificName').textContent = primary.scientificName;
    document.getElementById('confidenceFill').style.width = `${primary.confidence}%`;
    document.getElementById('confidenceText').textContent = `${primary.confidence}%`;
    document.getElementById('birdDescription').textContent = primary.description;
    
    // 填充标签
    const tagsContainer = document.getElementById('birdTags');
    tagsContainer.innerHTML = primary.tags.map(tag => 
        `<span class="tag">${tag}</span>`
    ).join('');

    // 填充其他可能
    const altList = document.getElementById('altList');
    altList.innerHTML = result.alternatives.map((alt, index) => `
        <div class="alt-item">
            <span class="alt-rank">${index + 2}</span>
            <span class="alt-name">${alt.name}</span>
            <span class="alt-confidence">${alt.confidence}%</span>
        </div>
    `).join('');

    // 滚动到结果
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ==================== 鸟类图鉴 ====================
function initBirdsGrid() {
    console.log('初始化鸟类图鉴，数据条数:', birdsDatabase.length);
    if (!birdsGrid) {
        console.error('找不到 birdsGrid 元素');
        return;
    }
    renderBirds(birdsDatabase);
}

function renderBirds(birds) {
    if (!birdsGrid) {
        console.error('birdsGrid 元素不存在');
        return;
    }
    
    if (birds.length === 0) {
        birdsGrid.innerHTML = '<p style="text-align: center; color: #666;">暂无鸟类数据</p>';
        return;
    }
    
    const html = birds.map(bird => `
        <div class="bird-card" data-category="${bird.category}">
            <div class="bird-card-image">
                <img src="${bird.image}" alt="${bird.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x300?text=${encodeURIComponent(bird.name)}'">
            </div>
            <div class="bird-card-content">
                <h4>${bird.name}</h4>
                <p class="scientific">${bird.scientificName}</p>
                <p>${bird.description.substring(0, 50)}...</p>
            </div>
        </div>
    `).join('');
    
    birdsGrid.innerHTML = html;
    console.log('鸟类图鉴渲染完成，显示', birds.length, '条记录');
}

function filterBirds(category) {
    // 更新按钮状态
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });

    // 过滤并渲染
    if (category === 'all') {
        renderBirds(birdsDatabase);
    } else {
        const filtered = birdsDatabase.filter(bird => bird.category === category);
        renderBirds(filtered);
    }
}

// ==================== 平滑滚动 ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 导航栏高亮
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}
