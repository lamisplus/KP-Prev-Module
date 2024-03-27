package org.lamisplus.modules.kp_prev.installers;

import com.foreach.across.core.annotations.Installer;
import com.foreach.across.core.installers.AcrossLiquibaseInstaller;
import org.springframework.core.annotation.Order;

@Order(1)
@Installer(name = "kp-prev-schema-installer",
        description = "Installs the required database tables",
        version = 12)
public class KpPrevInstaller extends AcrossLiquibaseInstaller {
    public KpPrevInstaller() {
        super("classpath:installers/kp_prev/schema/schema.xml");
    }
}
