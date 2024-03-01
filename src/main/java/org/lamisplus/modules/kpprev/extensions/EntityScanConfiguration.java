package org.lamisplus.modules.kpprev.extensions;

import com.foreach.across.core.annotations.ModuleConfiguration;
import com.foreach.across.modules.hibernate.provider.HibernatePackageConfigurer;
import com.foreach.across.modules.hibernate.provider.HibernatePackageRegistry;
import lombok.extern.slf4j.Slf4j;
import org.lamisplus.modules.kpprev.domain.KpPrevDomain;
import org.springframework.context.annotation.Configuration;


@Slf4j
@ModuleConfiguration({"AcrossHibernateJpaModule"})
@Configuration
public class EntityScanConfiguration implements HibernatePackageConfigurer {


    @Override
    public void configureHibernatePackage(HibernatePackageRegistry hibernatePackage) {
        hibernatePackage.addPackageToScan (KpPrevDomain.class);
    }
}
