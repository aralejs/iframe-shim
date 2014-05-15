var Shim = require('../index.js'),
    expect = require('expect.js'),
    $ = require('jquery');

describe('iframe-shim', function() {

    var div, isIE6 = (window.navigator.userAgent || '').toLowerCase().indexOf('msie 6') !== -1;

    beforeEach(function() {
        div = $('<div></div>').appendTo(document.body);
    });

    afterEach(function() {
        div.remove();
    });

    // 测试非 ie6 下返回的空实例
    it('return empty instance except ie6', function() {
        var target = $('<div></div>').css({'width': '100px', 'height': '100px', 'border': '1px solid #fff'}).appendTo(div);

        if (!isIE6) {
            var iframe = new Shim(target[0]);
            iframe.sync();

            expect(iframe.iframe).to.be(undefined);
            expect(iframe.target).to.be(undefined);

            expect(iframe.sync).not.to.be(undefined);
            expect(iframe.destroy).not.to.be(undefined);
        }

    });

    // 测试 iframe-shim 生成实例正常
    it('normal initialize ', function() {
        var target = $('<div></div>').css({'width': '100px', 'height': '100px', 'border': '1px solid #fff'}).appendTo(div);

        if (isIE6) {
            var iframe = new Shim(target[0]);
            iframe.sync();

            var iframeOffset = iframe.iframe.offset();
            var elementOffset = iframe.target.offset();

            expect(iframe.iframe.css('height')).to.be('102px');
            expect(iframe.iframe.css('width')).to.be('102px');
            expect(iframeOffset.left).to.be(elementOffset.left);
            expect(iframeOffset.top).to.be(elementOffset.top);
        }

    });

    // 测试 sync 函数，修改目标元素宽高和边框，iframe 重新计算
    it('function sync', function() {
        var target = $('<div></div>').css({'width': '100px', 'height': '100px', 'border': '1px solid #fff'}).appendTo(div);

        if (isIE6) {
            var iframe = new Shim(target[0]);
            target.css({'width': '400px', 'height': '200px', 'border': '5px solid #fff'});

            iframe.sync();

            expect(iframe.iframe.css('height')).to.be('210px');
            expect(iframe.iframe.css('width')).to.be('410px');
        }
    });

    // 测试当目标元素隐藏的时候sync函数，iframe会隐藏
    it('function sync when target is hidden', function() {
        var target = $('<div></div>').css({'width': '100px', 'height': '100px', 'border': '1px solid #fff'}).appendTo(div);

        if (isIE6) {
            var iframe = new Shim(target[0]);

            target.css({'width': 0, 'border': 'none'});
            iframe.sync();
            expect(iframe.iframe).to.be(undefined);

            target.css({'width': '10px', 'border': 'none'});
            iframe.sync();
            expect(iframe.iframe.css('display') === 'none').not.to.be.ok();

            target.css({'display': 'none'});
            iframe.sync();
            expect(iframe.iframe.css('display')).to.be('none');
        }
    });

    // 测试 destroy 函数
    it('function destroy', function() {
        var target = $('<div></div>').css({'width': '100px', 'height': '100px', 'border': '1px solid #fff'}).appendTo(div);

        if (isIE6) {
            var shim = new Shim(target[0]).sync();
            shim.destroy();

            expect(shim.iframe).to.be(undefined);
            expect(shim.target).to.be(undefined);
        }
    });

    // 测试 destroy 函数没有调用 sync
    it('function destroy when sync is not called', function() {
        var target = $('<div></div>').css({'width': '100px', 'height': '100px', 'border': '1px solid #fff'}).appendTo(div);

        if (isIE6) {
            var shim = new Shim(target[0]);
            shim.destroy();

            expect(shim.iframe).to.be(undefined);
            expect(shim.target).to.be(undefined);
        }
    });

    // 测试 destroy 函数没有调用 sync
    it('should pass #2', function() {
        var target1 = $('<div></div>').css({'width': '100px', 'height': '100px'}).appendTo(div);
        var target2 = $('<div></div>').css({'width': '100px', 'height': '100px', 'zIndex': 1}).appendTo(div);
        var target3 = $('<div></div>').css({'width': '100px', 'height': '100px', 'zIndex': 2}).appendTo(div);

        if (isIE6) {
            var shim1 = new Shim(target1[0]);
            shim1.sync();
            expect(shim1.iframe[0].style.zIndex).to.be(0);

            var shim2 = new Shim(target2[0]);
            shim2.sync();
            expect(shim2.iframe[0].style.zIndex).to.be(0);

            var shim3 = new Shim(target3[0]);
            shim3.sync();
            expect(shim3.iframe[0].style.zIndex).to.be(1);
        }
    });

    it('sync should chained call', function() {
        var target = $('<div></div>').css({'width': '100px', 'height': '100px'}).appendTo(div);
        var shim = new Shim(target[0]);

        expect(shim.sync()).to.be(shim);
    })
});
