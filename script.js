// 使用requestAnimationFrame优化动画性能
(function() {

    
    // 页面加载完成后执行
    document.addEventListener('DOMContentLoaded', function() {
        // 获取DOM元素
        const modal = document.getElementById('puzzle-modal');
        const answerInput = document.getElementById('answer-input');
        const submitButton = document.getElementById('submit-button');
        const errorText = document.getElementById('error-text');
        const boxImage = document.getElementById('box-image');
        const image1 = document.getElementById('image1');
        const image2 = document.getElementById('image2');
        const welcomeMessage = document.getElementById('welcome-message');
        const treasureBox = document.querySelector('.treasure-box');
        const imageContainer = document.querySelector('.image-container');
        
        // 正确答案
        const correctAnswer = '深深爱上一种奉献的哲学';
        
        // 点击宝箱后显示弹窗
        treasureBox.addEventListener('click', function() {
            // 先设置display再触发动画，确保动画正常播放
            modal.style.display = 'flex';
            // 强制重排以确保动画效果
            void modal.offsetWidth;
            // 添加弹出动画
            modal.querySelector('.modal-content').style.animation = 'slideIn 0.4s ease';
            // 自动聚焦到输入框，提升用户体验
            answerInput.focus();
        });
        
        // 输入验证功能
        submitButton.addEventListener('click', function() {
            validateAnswer();
        });
        
        // 按回车键也可以提交
        answerInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                validateAnswer();
            }
        });
        
        // 键盘可访问性 - ESC关闭弹窗
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
            }
        });
        
        // 验证答案函数
        function validateAnswer() {
            const userAnswer = answerInput.value.trim();
            
            // 忽略空格和大小写差异，进行更灵活的验证
            const normalizedUserAnswer = userAnswer.replace(/\s+/g, '');
            const normalizedCorrectAnswer = correctAnswer.replace(/\s+/g, '');
            
            if (normalizedUserAnswer === normalizedCorrectAnswer) {
                // 答案正确
                errorText.classList.add('hidden');
                
                // 关闭弹窗
                modal.style.display = 'none';
                
                // 触发宝箱打开动画
                openTreasureBox();
            } else {
                // 答案错误
                showError();
            }
        }
        
        // 显示错误信息并添加抖动动画
        function showError() {
            errorText.classList.remove('hidden');
            
            // 添加抖动动画
            answerInput.style.borderColor = '#e74c3c';
            answerInput.classList.add('shake');
            
            // 300ms后移除抖动动画
            setTimeout(() => {
                answerInput.classList.remove('shake');
            }, 300);
            
            // 2秒后隐藏错误信息
            setTimeout(() => {
                errorText.classList.add('hidden');
                answerInput.style.borderColor = '';
            }, 2000);
        }
        
        // 宝箱打开函数
        function openTreasureBox() {
            // 使用requestAnimationFrame优化动画性能
            requestAnimationFrame(() => {
                // 添加宝箱打开动画
                boxImage.style.transition = 'all 0.5s ease';
                treasureBox.style.animation = 'boxOpen 1s ease forwards';
                
                // 1秒后切换到打开的宝箱图片
                setTimeout(() => {
                    boxImage.src = 'images/box-open.svg';
                    
                    // 宝箱打开后立即显示欢迎文字
                    setTimeout(() => {
                        // 隐藏宝箱
                        treasureBox.style.transition = 'opacity 0.5s ease';
                        treasureBox.style.opacity = '0';
                        
                        // 直接显示欢迎文字
                        showWelcomeMessage();
                    }, 500);
                }, 1000);
            });
        }
        
        // 显示第一张图片
        function showFirstImage() {
            requestAnimationFrame(() => {
                // 隐藏宝箱
                treasureBox.style.transition = 'opacity 0.5s ease';
                treasureBox.style.opacity = '0';
                
                // 显示图片容器
                imageContainer.style.opacity = '0';
                imageContainer.style.display = 'block';
                
                // 显示第一张图片
                image1.classList.remove('hidden');
                image1.style.opacity = '0';
                
                // 添加淡入动画
                setTimeout(() => {
                    imageContainer.style.transition = 'opacity 0.5s ease';
                    imageContainer.style.opacity = '1';
                    
                    image1.style.transition = 'opacity 1s ease';
                    image1.style.opacity = '1';
                    
                    // 3秒后切换到第二张图片
                    setTimeout(() => {
                        switchToSecondImage();
                    }, 3000);
                }, 100);
            });
        }
        
        // 切换到第二张图片
        function switchToSecondImage() {
            requestAnimationFrame(() => {
                // 第一张图片淡出
                image1.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                image1.style.opacity = '0';
                image1.style.transform = 'translateX(-30px) scale(0.95)';
                
                // 第二张图片淡入并从右侧滑入
                image2.classList.remove('hidden');
                image2.style.opacity = '0';
                image2.style.transform = 'translateX(30px) scale(0.95)';
                image2.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                
                setTimeout(() => {
                    image2.style.opacity = '1';
                    image2.style.transform = 'translateX(0) scale(1)';
                    
                    // 1.5秒后显示欢迎文字
                    setTimeout(() => {
                        showWelcomeMessage();
                    }, 1500);
                }, 200);
            });
        }
        
        // 显示欢迎文字
        function showWelcomeMessage() {
            requestAnimationFrame(() => {
                // 显示欢迎消息容器
                welcomeMessage.classList.remove('hidden');
                welcomeMessage.style.opacity = '0';
                welcomeMessage.style.transform = 'translateY(20px)';
                
                // 添加淡入上移动画
                welcomeMessage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                setTimeout(() => {
                    welcomeMessage.style.opacity = '1';
                    welcomeMessage.style.transform = 'translateY(0)';
                    
                    // 获取并设置新添加的按钮
                      const showAlbumsButton = document.getElementById('show-albums-button');
                      if (showAlbumsButton) {
                          console.log('找到点这里按钮，绑定点击事件');
                          showAlbumsButton.addEventListener('click', handleXinClick);
                      }
                }, 100);
            });
        }
        
        // 添加输入框焦点和失焦效果
        answerInput.addEventListener('focus', function() {
            this.style.borderColor = '#ff7e2e';
        });
        
        answerInput.addEventListener('blur', function() {
            if (!errorText.classList.contains('hidden')) return;
            this.style.borderColor = '';
        });
    
        // 预加载所需图片
        function preloadImages() {
            const images = [
                'images/box-closed.svg',
                'images/box-open.svg',
                'images/阿信卜卜.png'
            ];
            
            images.forEach(src => {
                const img = new Image();
                img.src = src;
            });
        }
        

        
        // 调用预加载函数
        preloadImages();
  

  

        
        // 添加输入抖动样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
            
            .shake {
                animation: shake 0.3s ease-in-out;
            }
        `;
        document.head.appendChild(style);
        
        // 模拟专辑数据 - 从专辑-歌曲对照表.txt解析
        const albumData = [
            { name: '第一张创作专辑', date: '1999-07-07', song: '疯狂世界', image: 'images/第一张创作专辑 1999-07-07.png', mp3: 'MP3/1 疯狂世界.mp3' },
            { name: '爱情万岁', date: '2000-07-07', song: '温柔', image: 'images/爱情万岁 2000-07-07.png', mp3: 'MP3/2 温柔.mp3' },
            { name: '人生海海', date: '2001-07-06', song: '人生海海', image: 'images/人生海海 2001-07-06.png', mp3: 'MP3/3 人生海海.mp3' },
            { name: '时光机', date: '2003-11-11', song: '时光机', image: 'images/时光机 2003-11-11.png', mp3: 'MP3/4 时光机.mp3' },
            { name: '神的孩子都在跳舞', date: '2004-11-05', song: '倔强', image: 'images/神的孩子都在跳舞 2004-11-05.png', mp3: 'MP3/5 倔强.mp3' },
            { name: '为爱而生', date: '2006-12-29', song: '香水', image: 'images/为爱而生 2006-12-29.png', mp3: 'MP3/6 香水.mp3' },
            { name: '后青春的诗', date: '2008-10-23', song: '突然好想你', image: 'images/后青春的诗 2008-10-23.png', mp3: 'MP3/7 突然好想你.mp3' },
            { name: '第二人生', date: '2011-12-16', song: '星空', image: 'images/第二人生 2011-12-16.png', mp3: 'MP3/8 星空.mp3' },
            { name: '自传', date: '2016-07-21', song: '步步', image: 'images/自传 2016-07-21.png', mp3: 'MP3/8.1 步步.mp3' },
            { name: '自选作品集', date: '2013-12-30', song: '顽固', image: 'images/自选作品集 2013-12-30.png', mp3: 'MP3/9 顽固.mp3' }
        ];
        
        // 音频播放功能
        let currentAudio = null;
        let currentAlbumIndex = -1;
        
        function playAudio(albumIndex) {
            // 停止当前播放的音频
            if (currentAudio && currentAlbumIndex !== albumIndex) {
                currentAudio.pause();
                currentAudio = null;
                // 移除之前选中专辑的高亮
                const prevAlbum = document.querySelector(`.album-item[data-index="${currentAlbumIndex}"]`);
                if (prevAlbum) {
                    prevAlbum.classList.remove('playing');
                }
            }
            
            const album = albumData[albumIndex];
            if (!album) return;
            
            // 如果点击的是同一专辑，切换播放/暂停
            if (currentAlbumIndex === albumIndex && currentAudio) {
                if (currentAudio.paused) {
                    currentAudio.play().catch(e => {
                        console.error('播放失败:', e);
                        alert('音频播放失败，请检查文件是否存在');
                    });
                    document.querySelector(`.album-item[data-index="${albumIndex}"]`).classList.add('playing');
                } else {
                    currentAudio.pause();
                    document.querySelector(`.album-item[data-index="${albumIndex}"]`).classList.remove('playing');
                }
                return;
            }
            
            // 创建新的音频元素
            currentAudio = new Audio(album.mp3);
            currentAlbumIndex = albumIndex;
            
            // 添加错误处理
            currentAudio.onerror = function() {
                console.error('音频加载失败:', album.mp3);
                alert(`无法加载音频文件: ${album.song}`);
                currentAudio = null;
                currentAlbumIndex = -1;
            };
            
            // 播放完成后移除高亮
            currentAudio.onended = function() {
                const albumItem = document.querySelector(`.album-item[data-index="${albumIndex}"]`);
                if (albumItem) {
                    albumItem.classList.remove('playing');
                }
            };
            
            // 尝试播放
            currentAudio.play().catch(e => {
                console.error('播放失败:', e);
                alert('音频播放失败，请检查文件是否存在');
            });
            
            // 添加高亮效果
            document.querySelector(`.album-item[data-index="${albumIndex}"]`).classList.add('playing');
        }
        
        // 渲染专辑列表
        function renderAlbums() {
            const albumTrack = document.getElementById('album-track');
            if (!albumTrack) return;
            
            albumData.forEach((album, index) => {
                const albumItem = document.createElement('div');
                albumItem.className = 'album-item';
                albumItem.dataset.index = index;
                albumItem.innerHTML = `
                    <img src="${album.image}" alt="${album.name}" class="album-cover">
                    <div class="album-info">
                        <div class="album-name">${album.name}</div>
                        <div class="album-date">${album.date}</div>
                    </div>
                `;
                
                // 添加点击事件
                albumItem.addEventListener('click', () => {
                    playAudio(index);
                });
                
                albumTrack.appendChild(albumItem);
            });
        }
        
        // 获取元素引用
        const albumShowcase = document.getElementById('album-showcase');
        
        // 为点这里按钮添加点击事件处理函数，显示专辑展示区
        function handleXinClick(event) {
            // 显示专辑展示区
            if (albumShowcase) {
                // 添加显示动画
                albumShowcase.classList.remove('hidden');
                albumShowcase.style.opacity = '0';
                albumShowcase.style.transform = 'translateY(30px)';
                albumShowcase.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                
                setTimeout(() => {
                    albumShowcase.style.opacity = '1';
                    albumShowcase.style.transform = 'translateY(0)';
                    
                    // 渲染专辑列表
                    renderAlbums();
                    // 初始化滑动功能
                    initSwipeFunctionality();
                }, 100);
            }
        }
    });
    
    // 滑动功能初始化
    function initSwipeFunctionality() {
        const scrollContainer = document.querySelector('.album-scroll-container');
        if (!scrollContainer) {
            console.log('未找到滚动容器元素');
            return;
        }
        
        let isDragging = false;
        let startX;
        let scrollLeft;
        
        // 鼠标事件
        scrollContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
            scrollContainer.style.cursor = 'grabbing';
        });
        
        scrollContainer.addEventListener('mouseleave', () => {
            isDragging = false;
            scrollContainer.style.cursor = 'grab';
        });
        
        scrollContainer.addEventListener('mouseup', () => {
            isDragging = false;
            scrollContainer.style.cursor = 'grab';
        });
        
        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2; // 滚动速度
            scrollContainer.scrollLeft = scrollLeft - walk;
        });
        
        // 触摸事件（移动设备）
        let touchStartX;
        let touchStartScrollLeft;
        
        scrollContainer.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                touchStartX = e.touches[0].pageX - scrollContainer.offsetLeft;
                touchStartScrollLeft = scrollContainer.scrollLeft;
            }
        });
        
        scrollContainer.addEventListener('touchmove', (e) => {
            if (!touchStartX) return;
            e.preventDefault();
            const x = e.touches[0].pageX - scrollContainer.offsetLeft;
            const walk = (x - touchStartX) * 2;
            scrollContainer.scrollLeft = touchStartScrollLeft - walk;
        });
        
        scrollContainer.addEventListener('touchend', () => {
            touchStartX = null;
        });
        
        // 禁用默认的水平滚动反弹效果
        scrollContainer.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                e.preventDefault();
                scrollContainer.scrollLeft += e.deltaX;
            }
        });
    }
    
})();