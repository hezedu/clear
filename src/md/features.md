# vendor固定
本项目优先关注于http缓存，因此发现webpack自身缺陷：它使用数组索引，导致build出的文件飘忽不定，hash随便变化。比如vendor会受到app改动、`code-spiiting`的新chunk的影响。
详见：<a href="https://github.com/webpack/webpack/issues/1315" target="_blank">Vendor chunkhash changes when app code changes</a>

此bug已由本人在当前版本 **1.13.2**使用  ***key sort***的方法hack。详见：
<a href="https://github.com/webpack/webpack/issues/1315#issuecomment-247269598" target="_blank">Use the key sort to keep you vendor don't change.</a>

以后版本可不用hack。详见push：
<a href="https://github.com/webpack/webpack/pull/2998" target="_blank">fixed vendor when app code changes</a>

所以在本项目中你远不用担心200多kb的vendor会变化。

而webpack孤魂野鬼似的`chunk`文件仍然会***链式change*** 。根据webpack作者返馈，**webpack 2**仍会用数组索引。本人将会站在http缓存的角度关注的。
