import{_ as i,c as s,o as a,a2 as t}from"./chunks/framework.BJ0zSiM-.js";const c=JSON.parse('{"title":"自定义域名","description":"","frontmatter":{},"headers":[],"relativePath":"cn/docs/customize.md","filePath":"cn/docs/customize.md"}'),n={name:"cn/docs/customize.md"},l=t(`<h1 id="自定义域名" tabindex="-1">自定义域名 <a class="header-anchor" href="#自定义域名" aria-label="Permalink to &quot;自定义域名&quot;">​</a></h1><p>因合规需要，NetGuard 不响应来自<strong>中国</strong>的 SDK 初始化请求。因此，它们无法直连 NetGuard。</p><p>如果你确实需要向中国境内提供服务，可以使用 <a href="http://www.nginx.org" target="_blank" rel="noreferrer">Nginx</a> 把 SDK 初始化请求转发到 NetGuard。</p><div class="tip custom-block"><p class="custom-block-title">请注意</p><ol><li>只有<a href="./selfhosted.html">自建服务器</a>的开发者才能使用自定义域名</li><li>只有 SDK 初始化请求会被 Nginx 转发</li><li>App 的业务数据并不会通过 Nginx 转发</li></ol></div><h2 id="如何自定义域名" tabindex="-1">如何自定义域名 <a class="header-anchor" href="#如何自定义域名" aria-label="Permalink to &quot;如何自定义域名&quot;">​</a></h2><h3 id="准备工作" tabindex="-1">准备工作 <a class="header-anchor" href="#准备工作" aria-label="Permalink to &quot;准备工作&quot;">​</a></h3><p>你需要准备如下材料：</p><ol><li>一个属于你自己的域名</li><li>一个可以向<strong>中国境内</strong>提供服务的<strong>境外服务器</strong></li></ol><h3 id="设置-nginx" tabindex="-1">设置 Nginx <a class="header-anchor" href="#设置-nginx" aria-label="Permalink to &quot;设置 Nginx&quot;">​</a></h3><ol><li>在 Nginx 配置文件内新增主机（例如：netguard.example.com），并添加下列回源服务器： <ul><li>d1.udptcp.com</li><li>d2.udptcp.com</li><li>d3.udptcp.com</li></ul></li><li>在域名注册商的控制面板内新增对应的解析记录</li><li>修改 Nginx 配置文件，<strong>添加</strong>如下 HTTP 请求头:<table tabindex="0"><thead><tr><th>名称</th><th>值</th><th>备注</th></tr></thead><tbody><tr><td>X-NETGUARD-ID</td><td>你的 AppID</td><td>NetGuard 据此验证开发者身份</td></tr><tr><td>X-NETGUARD-KEY</td><td>你的 AppKey</td><td>NetGuard 据此验证开发者身份</td></tr><tr><td>TRUE-CLIENT-IP</td><td>客户端的真实 IP</td><td>NetGuard 据此分配转发服务器</td></tr></tbody></table></li><li>如果 HTTP 请求头没有被正确添加，则可能出现如下<strong>负面后果</strong>：<table tabindex="0"><thead><tr><th>原因</th><th>结果</th></tr></thead><tbody><tr><td>缺少 X-NETGUARD-ID</td><td>NetGuard 拒绝分配转发服务器</td></tr><tr><td>缺少 X-NETGUARD-KEY</td><td>NetGuard 拒绝分配转发服务器</td></tr><tr><td>缺少 TRUE-CLIENT-IP</td><td>NetGuard 拒绝分配转发服务器</td></tr><tr><td>错的 TRUE-CLIENT-IP</td><td>NetGuard 无法提供 DDoS 防护</td></tr></tbody></table></li></ol><h2 id="修改接入代码" tabindex="-1">修改接入代码 <a class="header-anchor" href="#修改接入代码" aria-label="Permalink to &quot;修改接入代码&quot;">​</a></h2><p>根据<a href="./integrate.html">开发文档</a>接入 NetGuard SDK 后，需要稍微修改一下接入代码</p><h3 id="microsoft-windows" tabindex="-1">Microsoft Windows <a class="header-anchor" href="#microsoft-windows" aria-label="Permalink to &quot;Microsoft Windows&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 修改这一行</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">init</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;DEVELOPEMENT_APP_ID&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 改为</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">init</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;你的域名&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;DEVELOPEMENT_APP_ID&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span></code></pre></div><h3 id="google-android" tabindex="-1">Google Android <a class="header-anchor" href="#google-android" aria-label="Permalink to &quot;Google Android&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 修改这一行</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">bool bInit </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Shield.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Init</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;DEVELOPEMENT_APP_ID&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 改为</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">bool bInit </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Shield.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Init</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;你的域名&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;DEVELOPEMENT_APP_ID&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><h3 id="apple-ios-ipados" tabindex="-1">Apple iOS/iPadOS <a class="header-anchor" href="#apple-ios-ipados" aria-label="Permalink to &quot;Apple iOS/iPadOS&quot;">​</a></h3><div class="language-objective-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">objective-c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 修改这一行</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">BOOL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> bInit </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [s </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Init:nil</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> key:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">@&quot;DEVELOPEMENT_APP_ID&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">];</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 改为</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">BOOL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> bInit </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [s </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Init:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">@&quot;你的域名&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> key:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">@&quot;DEVELOPEMENT_APP_ID&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">];</span></span></code></pre></div><h2 id="如果-nginx-被攻击" tabindex="-1">如果 Nginx 被攻击 <a class="header-anchor" href="#如果-nginx-被攻击" aria-label="Permalink to &quot;如果 Nginx 被攻击&quot;">​</a></h2><p>NetGuard 的 SDK 会把初始化的结果缓存到本地，初始化失败时会尝试从缓存初始化。</p><p>因此，即使 Nginx 掉线，也不会对业务造成大的影响，受到影响的只有新安装 App 的用户。</p><div class="tip custom-block"><p class="custom-block-title">请注意</p><ol><li>你可以在 Nginx 前面加上 CDN 来加速请求</li><li>你可以在 Nginx 前面加上 WAF 拦截恶意请求</li><li>架构应是 SDK --&gt; CDN(可选) --&gt; WAF(可选) --&gt; Nginx --&gt; NetGuard</li></ol></div><h2 id="下一步做什么" tabindex="-1">下一步做什么 <a class="header-anchor" href="#下一步做什么" aria-label="Permalink to &quot;下一步做什么&quot;">​</a></h2><p>如果接入后依然无法连接到 NetGuard 服务器，请参考<a href="./qa.html">常见问题</a></p>`,24),h=[l];function e(p,d,k,r,o,E){return a(),s("div",null,h)}const u=i(n,[["render",e]]);export{c as __pageData,u as default};
