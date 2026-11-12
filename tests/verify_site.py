from pathlib import Path
from html.parser import HTMLParser
import re,hashlib,subprocess,json
root=Path(__file__).resolve().parents[1]
class Refs(HTMLParser):
    def __init__(self): super().__init__();self.refs=[]
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        for k in ('src','href'):
            if attrs.get(k):self.refs.append(attrs[k])
for html in root.rglob('*.html'):
    r=Refs();r.feed(html.read_text())
    for ref in r.refs:
        if ref.startswith(('#','http:','https:','mailto:','data:')):continue
        assert (html.parent /ref.split('?')[0].split('#')[0]).resolve().exists(),f'{html}: {ref}'
for js in root.rglob('*.js'):
    subprocess.run(['node','--check',str(js)],check=True,capture_output=True)
files=[p for p in root.rglob('*') if p.is_file()]
for p in files:
    assert not p.name.endswith(('.pdf','.sqlite','.sqlite3','.db','.gguf','.env','.zip'))
    assert p.stat().st_size < 2_000_000, f'Unexpectedly large public asset: {p}'
assert len([s for s in re.findall('data-theme="', (root/'demo/styles.css').read_text())])>=9
assert (root/'CNAME').read_text().strip()=='btl.masynnay.com'
assert 'href="demo/"' in (root/'index.html').read_text()
assert "connect-src 'none'" in (root/'demo/index.html').read_text()
assert "connect-src 'none'" in (root/'index.html').read_text()
assert not re.search(r'fetch\(|XMLHttpRequest|https?://[^< ]+\.pdf', (root/'demo/demo.js').read_text())
result={'status':'PASS','files':len(files),'external_apis':0,'linked_files':'resolved','cname':'btl.masynnay.com','size_bytes':sum(p.stat().st_size for p in files),'privacy_scan':'no private application files'}
print(json.dumps(result,indent=2))
