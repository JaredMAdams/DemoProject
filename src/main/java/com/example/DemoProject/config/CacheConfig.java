package com.example.DemoProject.config;

import com.example.DemoProject.entities.Employee;
import org.ehcache.config.CacheConfiguration;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ExpiryPolicyBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.config.units.MemoryUnit;
import org.ehcache.jsr107.Eh107Configuration;
import javax.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.cache.Caching;
import javax.cache.spi.CachingProvider;
import java.time.Duration;

@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public CacheManager EhCacheManager() {
        CacheConfiguration<String, Employee> cacheConfig = CacheConfigurationBuilder
                .newCacheConfigurationBuilder(String.class, Employee.class, ResourcePoolsBuilder
                        .newResourcePoolsBuilder()
                        .offheap(10, MemoryUnit.MB)
                        .build())
                .withExpiry(ExpiryPolicyBuilder.timeToIdleExpiration(Duration.ofSeconds(300)))
                .build();

        CachingProvider cachingProvider = Caching.getCachingProvider();
        CacheManager cacheManager = cachingProvider.getCacheManager();

        javax.cache.configuration.Configuration<String, Employee> config = Eh107Configuration.fromEhcacheCacheConfiguration(cacheConfig);
        cacheManager.createCache("employeeId", config);
        return cacheManager;
    }

    //Having multiple caches causes ehcache to give error saying it was expected to be a springframework cache.
    //Unsure of resolution for this problem.

//    @Bean
//    public org.springframework.cache.CacheManager alternateCacheManager() {
//        return new ConcurrentMapCacheManager("employeeFirstName");
//    }
}
