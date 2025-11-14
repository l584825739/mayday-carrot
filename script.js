// 使用requestAnimationFrame优化动画性能
(function() {
    // 注册Service Worker，使应用支持PWA功能
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker 注册成功，作用域为:', registration.scope);
                })
                .catch(error => {
                    console.log('Service Worker 注册失败:', error);
                });
        });
    }
    
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
        
        // 显示欢迎文字和图片
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
                }, 100);
            });
        }
        
        // 调用预加载函数
        preloadImages();
  
         // 微信环境检测函数
          function isWechatEnvironment() {
              const ua = navigator.userAgent.toLowerCase();
              return ua.indexOf('micromessenger') !== -1;
          }
          
          // 微信环境优化函数
          function optimizeForWechat() {
              if (isWechatEnvironment()) {
                  console.log('检测到微信环境，应用优化');
                  
                  // 修复微信浏览器中的触摸事件延迟
                  document.addEventListener('touchstart', function() {}, { passive: true });
                  
                  // 优化动画性能
                  if (window.requestAnimationFrame) {
                      // 使用requestAnimationFrame代替setTimeout进行动画
                      const originalSetTimeout = window.setTimeout;
                      window.setTimeout = function(callback, delay) {
                          if (typeof callback === 'function' && delay < 100) {
                              // 短延迟动画使用requestAnimationFrame
                              let start = null;
                              function step(timestamp) {
                                  if (!start) start = timestamp;
                                  const progress = timestamp - start;
                                  if (progress >= delay) {
                                      callback();
                                  } else {
                                      window.requestAnimationFrame(step);
                                  }
                              }
                              window.requestAnimationFrame(step);
                          } else {
                              originalSetTimeout(callback, delay);
                          }
                      };
                  }
                  
                  // 修复微信中的图片加载问题
                  const images = document.querySelectorAll('img');
                  images.forEach(img => {
                      // 预加载图片并确保在微信中正确显示
                      if (!img.complete) {
                          img.onload = function() {
                              img.style.visibility = 'visible';
                          };
                          img.style.visibility = 'hidden';
                      }
                  });
              }
          }
          
          // 在页面加载时执行微信环境优化
          optimizeForWechat();
  
         // 微信分享功能实现 - 优化版本，增强微信环境兼容性
         function setupShareFunctionality() {
             const shareBtn = document.getElementById('shareBtn');
             const currentUrl = window.location.href;
             const shareTitle = '神秘宝箱等你来开！';
             const isWechat = isWechatEnvironment();
             
             if (shareBtn) {
                 shareBtn.addEventListener('click', function() {
                     // 创建一个简单的分享提示弹窗
                     const popup = document.getElementById('popup');
                     const popupMessage = document.getElementById('popup-message');
                     
                     // 根据是否在微信环境显示不同的提示内容
                     if (isWechat) {
                         popupMessage.innerHTML = `
                             分享到微信<br>
                             <div style="margin: 10px 0;">
                                 <span style="font-size: 14px;">标题: ${shareTitle}</span><br>
                                 <span style="font-size: 12px; color: #666;">请点击右上角 ··· 选择分享</span>
                             </div>
                         `;
                     } else {
                         // 非微信环境下提供复制链接功能
                         popupMessage.innerHTML = `
                             分享链接<br>
                             <div style="margin: 10px 0;">
                                 <button id="copyLinkBtn" style="background: #07C160; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">复制链接</button>
                             </div>
                             <div style="margin-top: 10px; font-size: 12px; word-break: break-all; background: #f5f5f5; padding: 8px; border-radius: 4px;">
                                 ${currentUrl}
                             </div>
                         `;
                         
                         // 绑定复制按钮事件
                         document.getElementById('copyLinkBtn').addEventListener('click', function() {
                             // 使用更兼容的复制方法
                             const textArea = document.createElement('textarea');
                             textArea.value = currentUrl;
                             textArea.style.position = 'fixed';
                             textArea.style.left = '-999999px';
                             textArea.style.top = '-999999px';
                             document.body.appendChild(textArea);
                             textArea.focus();
                             textArea.select();
                             
                             try {
                                 document.execCommand('copy');
                                 popupMessage.innerHTML = '<div style="text-align: center; padding: 20px;">链接复制成功！</div>';
                                 setTimeout(() => {
                                     popup.style.display = 'none';
                                 }, 2000);
                             } catch (err) {
                                 console.error('复制失败:', err);
                             } finally {
                                 document.body.removeChild(textArea);
                             }
                         });
                     }
                     
                     popup.style.display = 'block';
                 });
             }
         }

        // 初始化分享功能
        setupShareFunctionality();
        
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
    });
    
    
})();