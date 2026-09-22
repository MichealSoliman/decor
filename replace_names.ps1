$files = @(
    "index.html",
    "about\index.html",
    "services\index.html",
    "gallry\index.html",
    "contect\index.html"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = [System.IO.File]::ReadAllText((Resolve-Path $file).Path, [System.Text.Encoding]::UTF8)
        
        # 1. Fix the logo HTML structure
        $content = $content -replace '<span class="logo-title".*?>.*?</span>\s*<span class="logo-subtitle">.*?</span>', '<span class="logo-title" style="font-size: 1.1rem; line-height: 1.4;">شركة المتقدم الاحترافي<br><span style="font-size: 0.85rem; color: #a51315;">للديكور</span></span>'
        
        # 2. Fix copyright
        $content = $content -replace 'شركة المتقدم للديكور \(الاحترافي \)', 'شركة المتقدم الاحترافي للديكور'
        
        # 3. Replace "شركة المتقدم للديكور"
        $content = $content -replace 'شركة المتقدم للديكور(?!\s*\(الاحترافي)', 'شركة المتقدم الاحترافي للديكور'
        
        # 4. Replace "المتقدم للديكور"
        $content = $content -replace '(?<!شركة\s)المتقدم للديكور', 'شركة المتقدم الاحترافي للديكور'
        
        # 5. Replace "شركة المتقدم"
        $content = $content -replace 'شركة المتقدم(?!\sالاحترافي)', 'شركة المتقدم الاحترافي للديكور'
        
        # 6. Replace specific straggling "المتقدم" in meta/title/alt texts
        $content = $content -replace 'المتقدم \|', 'شركة المتقدم الاحترافي للديكور |'
        $content = $content -replace 'خدمات المتقدم في', 'خدمات شركة المتقدم الاحترافي للديكور في'
        $content = $content -replace 'تواصل مع المتقدم لتوريد', 'تواصل مع شركة المتقدم الاحترافي للديكور لتوريد'
        $content = $content -replace 'مشاريع وتغطيات المتقدم في', 'مشاريع وتغطيات شركة المتقدم الاحترافي للديكور في'
        $content = $content -replace 'لوجو المتقدم والتصميم', 'لوجو شركة المتقدم الاحترافي للديكور'
        $content = $content -replace 'لوجو المتقدم(?!\sالاحترافي)', 'لوجو شركة المتقدم الاحترافي للديكور'
        $content = $content -replace 'المتقدم الصفحة الرئيسية', 'شركة المتقدم الاحترافي للديكور الصفحة الرئيسية'
        
        # Write back
        [System.IO.File]::WriteAllText((Resolve-Path $file).Path, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Processed $file"
    }
}
