# test_package.Tests.ps1

# Load the module to be tested
Import-Module -Name "C:\Users\eness\hydrogen-storefront\hydrogen-storefront\app\components\PageLayout.tsx"

Describe "PageLayout Component" {
    It "Should have a header with the correct text" {
        $component = Get-Content -Path "C:\Users\eness\hydrogen-storefront\hydrogen-storefront\app\components\PageLayout.tsx"
        $component | Should -Contain "<header>"
        $component | Should -Contain "<h1>My Shopify Store</h1>"
    }

    It "Should have a footer with the correct text" {
        $component = Get-Content -Path "C:\Users\eness\hydrogen-storefront\hydrogen-storefront\app\components\PageLayout.tsx"
        $component | Should -Contain "<footer>"
        $component | Should -Contain "&copy;"
    }
}

Describe "CSS Styles" {
    It "Should have body styles defined" {
        $styles = Get-Content -Path "C:\Users\eness\hydrogen-storefront\app\styles\app.css"
        $styles | Should -Contain "body {"
        $styles | Should -Contain "font-family: Arial, sans-serif;"
    }

    It "Should have page-layout styles defined" {
        $styles = Get-Content -Path "C:\Users\eness\hydrogen-storefront\app\styles\app.css"
        $styles | Should -Contain ".page-layout {"
        $styles | Should -Contain "display: flex;"
    }
}