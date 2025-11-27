<script setup>
import SiteStatusCard from '@/components/cards/SiteStatusCard.vue'

const sites = [
  { protocol: 'https', domain: 'icy.ankerfy.dpdns.org' },
  { protocol: 'https', domain: 'mine.diudue.dpdns.org' },
  { protocol: 'https', domain: 'bj.diudue.dpdns.org' },
  { protocol: 'https', domain: 'ro.diudue.dpdns.org' },
  { protocol: 'https', domain: 'tiny.diudue.dpdns.org' },
  { protocol: 'https', domain: 'tin.diudue.dpdns.org' },
  { protocol: 'https', domain: 'tiy.diudue.dpdns.org' },
  { protocol: 'https', domain: 'tny.diudue.dpdns.org' },
]

// 定义 refs 来引用 DOM 元素
const uuidInput = ref(null)
const generateBtn = ref(null)
const copyBtn = ref(null)
const resetBtn = ref(null)

// 生成 UUID 函数
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// 在组件挂载后执行
onMounted(() => {
  // 给按钮添加点击事件监听器
  generateBtn.value.addEventListener('click', () => {
    uuidInput.value.value = generateUUID()
  })

  // 复制节点配置
  copyBtn.value.addEventListener('click', async () => {
    const nodeType = document.getElementById('node-type')?.value
    const domain = document.getElementById('domain')?.value?.trim()
    const customDomain = document.getElementById('custom-domain')?.value?.trim()
    const uuid = uuidInput.value?.value?.trim()

    // 必填项校验：订阅类型和域名始终必填
    if (!nodeType || !domain) {
      alert('请填写订阅类型和域名！')
      return
    }

    let fullPath

    if (customDomain) {
      // 自定义域存在：domain/customDomain/nodeType
      fullPath = `https://${domain}/${customDomain}/${nodeType}`
    } else {
      // 自定义域为空：domain/uuid/nodeType
      if (!uuid) {
        alert('自定义域未填写时，请先生成或输入 UUID！')
        return
      }
      fullPath = `https://${domain}/${uuid}/${nodeType}`
    }

    try {
      await navigator.clipboard.writeText(fullPath)
      alert(`已复制节点配置路径：\n${fullPath}`)
    } catch (err) {
      console.error('复制失败:', err)
      alert('复制失败，请手动复制。')
    }
  })

  // 重置表单
  resetBtn.value.addEventListener('click', () => {
    document.getElementById('node-config-form').reset()
    uuidInput.value.value = ''
  })
})
</script>

<template>
  <div class="site-status-card-container">
    <h4>站点监测</h4>
    <div class="site-status-card">
      <!-- 站点状态 -->
      <SiteStatusCard
        v-for="(item, index) in sites"
        :key="index"
        :domain="item.domain"
        :protocol="item.protocol"
      />
    </div>
  </div>
  <div class="node-monitor-section">
    <h4>节点配置</h4>
    <!-- UUID 生成区域 -->
    <div class="uuid-generator">
      <label for="uuid-input">uuid:</label>
      <div class="input-group">
        <input
          ref="uuidInput"
          id="uuid-input"
          placeholder="请输入或自动生成 UUID"
          value=""
          readonly
        />
        <button ref="generateBtn" id="generate-uuid-btn">生成</button>
      </div>
    </div>

    <!-- 节点参数配置 -->
    <div class="node-config">
      <form id="node-config-form">
        <div class="form-row">
          <label for="node-type">订阅类型：</label>
          <select id="node-type" name="nodeType" required>
            <option value="">请选择</option>
            <option value="pty">V2ray(聚合)</option>
            <option value="pcl">Clash(内核)</option>
          </select>
        </div>
        <div class="form-row">
          <label for="domain">域名：</label>
          <input id="domain" type="text" name="domain" placeholder="如：xxx.example.com" required />
        </div>
        <div class="form-row">
          <label for="custom-domain">自定义域：</label>
          <input
            id="custom-domain"
            type="text"
            name="customDomain"
            placeholder="如：test"
            required
          />
        </div>
      </form>
    </div>

    <!-- 节点订阅获取按钮 -->
    <div class="action-buttons">
      <button ref="copyBtn" id="copy-link-btn">复制订阅链接</button>
      <button ref="resetBtn" id="reset-form-btn">重置</button>
    </div>
  </div>
</template>

<style scoped>
/* 站点监测部分 */
.site-status-card-container {
  display: flex;
  flex-direction: column;
  background-color: #fcfcfc;
  gap: 20px;
  margin-top: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); */
}

.site-status-card-container h4 {
  padding-left: 20px;
  margin-bottom: 5px;
}

.site-status-card {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 20px;
}

/* 节点配置部分 */
.node-monitor-section {
  max-width: 400px;
  width: 100%;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); */
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  margin-top: 20px;
  font-size: 14px;
}

.node-monitor-section h4 {
  margin: 0 0 20px;
  color: #222;
  font-weight: 600;
  font-size: 18px;
}

.uuid-generator label,
.form-row label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
}

.input-group {
  display: flex;
  gap: 12px;
  align-items: center;
}

#uuid-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-family: monospace;
  font-size: 14px;
  background-color: #f9f9f9;
}

#generate-uuid-btn {
  padding: 10px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

#generate-uuid-btn:hover {
  background-color: #0056b3;
}

/* 表单行 */
.form-row {
  margin-bottom: 18px;
}

.form-row select,
.form-row input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-row select:focus,
.form-row input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
}

/* 按钮组 */
.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  justify-content: flex-end; /* 按钮靠右对齐（常见于表单底部） */
}

.action-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

#copy-link-btn {
  background-color: #28a745;
  color: white;
}

#copy-link-btn:hover {
  background-color: #218838;
  transform: translateY(-1px);
}

#reset-form-btn {
  background-color: #6c757d;
  color: white;
}

#reset-form-btn:hover {
  background-color: #545b62;
  transform: translateY(-1px);
}
</style>