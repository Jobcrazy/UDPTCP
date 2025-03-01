import{_ as s,c as i,o as a,a2 as n}from"./chunks/framework.BJ0zSiM-.js";const c=JSON.parse('{"title":"接入NetGuard SDK","description":"","frontmatter":{},"headers":[],"relativePath":"cn/docs/integrate.md","filePath":"cn/docs/integrate.md"}'),l={name:"cn/docs/integrate.md"},t=n(`<h1 id="接入netguard-sdk" tabindex="-1">接入NetGuard SDK <a class="header-anchor" href="#接入netguard-sdk" aria-label="Permalink to &quot;接入NetGuard SDK&quot;">​</a></h1><p>NetGuard SDK 支持常见客户端操作系统，当前页面提供了全部的接入方法</p><ul><li>如果你想节省成本，或不想了解太多技术细节，可以加入<a href="./shared.html">共同防御计划</a></li><li>如果你想<a href="./selfhosted.html">自建NetGuard服务器</a>，强烈建议你先了解它的<a href="./principle.html">工作原理</a></li></ul><h2 id="下载netguard-sdk" tabindex="-1">下载NetGuard SDK <a class="header-anchor" href="#下载netguard-sdk" aria-label="Permalink to &quot;下载NetGuard SDK&quot;">​</a></h2><ul><li>开发者需要先<a href="https://drive.google.com/drive/folders/15Y6rKEeYEIU9TE6OIgN-oOjfFxWr6pLG" target="_blank" rel="noreferrer">点这里</a>，下载NetGuard的 SDK</li><li>在开始接入前，开发者需要在<a href="http://user.udptcp.com" target="_blank" rel="noreferrer">管理后台</a>，获取专属的 AppID 和 AppKey</li><li>根据自身需要，为不同平台的<strong>客户端 App</strong>接入NetGuard的 SDK</li></ul><h2 id="不同系统的接入方法" tabindex="-1">不同系统的接入方法 <a class="header-anchor" href="#不同系统的接入方法" aria-label="Permalink to &quot;不同系统的接入方法&quot;">​</a></h2><h3 id="microsoft-windows" tabindex="-1">Microsoft Windows <a class="header-anchor" href="#microsoft-windows" aria-label="Permalink to &quot;Microsoft Windows&quot;">​</a></h3><p>NetGuard SDK 的 Windows 版包含 Shield.exe 和 libshield.dll 两个文件。其中 libshield.dll 导出了一个名为_Init 的函数，此函数遵守 C 调用约定(__cdecl)。开发者可以用如下两种不同的办法接入：</p><h4 id="零代码接入" tabindex="-1">零代码接入 <a class="header-anchor" href="#零代码接入" aria-label="Permalink to &quot;零代码接入&quot;">​</a></h4><p>这种方式适合没有太多编程基础的开发者。只需要编写配置文件，并把配置文件和 Shield.exe 及 libshield.dll 放到一起，然后运行 Shield.exe 就可以了。配置文件的名称必须是 Shield.ini，它的内容如下：</p><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">[Shield]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">AppID</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> = DEVELOPEMENT_APP_ID</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">; DEVELOPEMENT_APP_ID需要替换为开发者自己的AppID</span></span></code></pre></div><h4 id="动态库接入" tabindex="-1">动态库接入 <a class="header-anchor" href="#动态库接入" aria-label="Permalink to &quot;动态库接入&quot;">​</a></h4><p>这种方式适合有 Windows 编程基础的开发者。如果你想确保在NetGuard初始化成功后再运行别的业务逻辑，推荐使用此方式。下面的代码演示了如何在 C/C++代码中进行接入：</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 建议在单独的进程中加载这个动态链接库</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 如果直接加载到App进程内，可能导致App</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 崩溃或无法连接到服务器</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 1. 声明SDK里面的函数</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">extern</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;C&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    typedef</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">InitFunc)(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">char</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">char</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 2. 恰当的时机加载动态链接库，并进行初始化</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">HMODULE hMod </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> LoadLibrary</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;libshield.dll&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">hMod)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 没有找到libshield.dll</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">InitFunc init </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (InitFunc)</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GetProcAddress</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(hMod, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Init&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">init)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 没有找到_Init函数</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">init</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;DEVELOPEMENT_APP_ID&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  //这里需要替换为开发者自己的AppID</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 初始化失败</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 代码执行到这里代表初始化成功</span></span></code></pre></div><h3 id="google-android" tabindex="-1">Google Android <a class="header-anchor" href="#google-android" aria-label="Permalink to &quot;Google Android&quot;">​</a></h3><p>NetGuard SDK 的 Android 版本只有一个 AAR 文件，请将其放到 App 主工程的 libs 目录下(一般是 app/libs)</p><ol><li>App 级别的 build.gradle 增加如下项目，注意不要重复添加</li></ol><div class="language-gradle vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gradle</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>android {</span></span>
<span class="line"><span>    sourceSets.main {</span></span>
<span class="line"><span>        jniLibs.srcDirs = [&#39;libs&#39;]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>dependencies {</span></span>
<span class="line"><span>    implementation files(&#39;libs/libshield.aar&#39;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><ol start="2"><li>在首个 Activity 或 Application 类里进行初始化</li></ol><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 返回值为true代表初始化成功</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">bool bInit </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Shield.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Init</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;DEVELOPEMENT_APP_ID&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//这里需要替换为开发者自己的AppID</span></span></code></pre></div><h3 id="apple-ios-ipados" tabindex="-1">Apple iOS/iPadOS <a class="header-anchor" href="#apple-ios-ipados" aria-label="Permalink to &quot;Apple iOS/iPadOS&quot;">​</a></h3><p>NetGuard SDK 的 iOS 版同时支持 iPadOS，它包含有如下两个文件：</p><ul><li>头文件：Shield.h</li><li>静态链接库：libshield.a</li></ul><p>下面的代码演示了如何在 Objective-C 代码中加载并初始化NetGuard的步骤：</p><div class="language-objective-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">objective-c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 1. 先在iOS的项目中添加libshield.a，否则编译将会失败</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 2. 包含头文件</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">#import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Shield.h&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 3. 在恰当的时机进行初始化，返回值为true代表成功</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Shield </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">s </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [Shield </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">getInstance</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">];</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">BOOL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> bInit </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [s </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Init:nil</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> key:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">@&quot;DEVELOPEMENT_APP_ID&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//这里需要替换为开发者自己的AppID</span></span></code></pre></div><h2 id="获取客户端真实ip" tabindex="-1">获取客户端真实IP <a class="header-anchor" href="#获取客户端真实ip" aria-label="Permalink to &quot;获取客户端真实IP&quot;">​</a></h2><p>在正常情况下，回源服务器不能获取客户端的真实IP地址，而只是虚拟的IP地址。</p><p>请<a href="https://drive.google.com/drive/folders/15Y6rKEeYEIU9TE6OIgN-oOjfFxWr6pLG" target="_blank" rel="noreferrer">点这里</a>下载对应的插件，并安装到<strong>回源服务器</strong>，即可获取客户端的真实IP地址。</p><div class="tip custom-block"><p class="custom-block-title">注意</p><ul><li>如果回源服务器是Windows系统，安装插件后需要重启App服务端</li><li>如果回源服务器是Linux系统，编译并安装插件后会立刻生效</li><li>只有加入<a href="./shared.html">共同防御计划</a>的开发者才能获取客户端真实IP</li></ul></div><h2 id="接入之后的处理" tabindex="-1">接入之后的处理 <a class="header-anchor" href="#接入之后的处理" aria-label="Permalink to &quot;接入之后的处理&quot;">​</a></h2><ul><li>登录到<a href="http://user.udptcp.com" target="_blank" rel="noreferrer">管理后台</a>，根据需要正确的添加转发规则</li><li>更改原有的代码，不再连接原有 TCP 服务器，改为连接本地回环 IP 地址</li><li><strong>移动端</strong>的本地回环 IP 地址全部是 127.0.0.1，<strong>PC 端</strong>的回环 IP 地址需要<strong>从管理后台获取</strong></li><li>如果在接入NetGuard的 SDK 后遇到其他问题，请参考<a href="./qa.html">常见问题</a></li></ul>`,31),e=[t];function h(p,k,r,d,o,E){return a(),i("div",null,e)}const y=s(l,[["render",h]]);export{c as __pageData,y as default};
