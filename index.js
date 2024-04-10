/**
 * @file mofron-comp-framebutton/index.js
 * @brief image switch component for mofron
 * @license MIT
 */
const Text    = require('mofron-comp-text');
const Frame   = require('mofron-comp-frame');
const Button  = require('mofron-comp-button');
const Link    = require('mofron-event-link');
const Click   = require('mofron-event-click');
const ConfArg = mofron.class.ConfArg;
const comutl  = mofron.util.common;

module.exports = class extends Frame {
    /**
     * initialize component
     * 
     * @param (mixed) 
     *                key-value: component config
     * @short 
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname('FrameButton');
            
            this.confmng().add('pressEvent', { type:'event', list:true });

	    if (0 < arguments.length) {
                this.config(p1);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomConts () {
        try {
	    super.initDomConts();
            this.size('1rem','0.5rem');
	    this.style({
                'display':         'flex',
                'align-items':     'center',
                'justify-content': 'center'
	    });
            
            /* text config */
            this.text().config({
                size: '0.25rem',
                style: {
                    'text-align': 'center',
                    'margin-top': '0.1rem',
		    'height':     '100%'
                }
            });
	    this.child(this.text());
            
            let frm     = this; 
            let clk_evt = (c1,c2,c3) => {
                try {
                    let evt = frm.pressEvent();
                    for (let eidx in evt) {
                        evt[eidx][0](frm, c2, evt[eidx][1]);
                    }
                    
		} catch (e) {
                    console.error(e.stack);
                    throw e;
                }
	    }
	    this.event(new Click(clk_evt));
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    url (prm) {
        try {
            if (undefined === prm) {
                return this.event({ modname:'Link' }).url();
            }
	    this.event(new Link(prm));
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    text (prm, cnf) {
        try {
            if ('string' === typeof prm) {
                this.text().text(prm);
                this.text().config(cnf);
                return;
            }
            return this.innerComp('text', prm, Text);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    pressEvent (fnc, prm) {
        try {
	    if (undefined === fnc) {
                return this.confmng('pressEvent');
	    }
            return this.confmng('pressEvent', [fnc,prm]);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

}
/* end of file */
