package indiv.configurer;

import org.springframework.context.annotation.Configuration;
/*
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
*/
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // /로 오는 요청을 localhost:5173으로 리디렉션
        registry.addViewController("/").setViewName("redirect:http://localhost:5173");
    }
    
    /*
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
			.allowedOrigins("http://localhost:5173/**")
			.allowedMethods("GET", "POST", "PUT", "DELETE")
			.allowedHeaders("*")
            .allowedHeaders("Authorization", "Content-Type")
            .exposedHeaders("Custom-Header")
            .allowCredentials(true)
            .maxAge(3600);
	}
	*/
    
	/*
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:5173");  // Vue 앱의 URL
        config.addAllowedMethod("*");  // 모든 HTTP 메서드 허용
        config.addAllowedHeader("*");  // 모든 헤더 허용
        config.setAllowCredentials(true);  // 쿠키를 함께 보내려면 true로 설정

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);  // 모든 경로에 대해 CORS 허용

        return new CorsFilter(source);
    }
    */
}
