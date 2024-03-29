package org.lamisplus.modules.KP_PREV.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(2)
@Installer(name = "patient-module-service-installer",
        description = "insert the required patient service",
        version = 1)
public class KpPrevModuleServiceInstaller extends AcrossLiquibaseInstaller {
    public KpPrevModuleServiceInstaller() {
        super ("classpath:installers/patient/schema/insert-service.xml");
    }
}
