package org.lamisplus.modules.kpprev;

import com.foreach.across.config.AcrossApplication;
import com.foreach.across.core.AcrossModule;
import com.foreach.across.core.context.configurer.ComponentScanConfigurer;

@AcrossApplication(
        modules = {

        }
)
public class KpPrevModule extends AcrossModule {
    public  static final String NAME = "KpPrevModule";

    public KpPrevModule() {
        super ();
        addApplicationContextConfigurer (new ComponentScanConfigurer (
                getClass ().getPackage ().getName () + ".repository",
                getClass ().getPackage ().getName () + ".service",
                getClass ().getPackage ().getName () + ".controller",
                getClass ().getPackage ().getName () + ".domain",
                getClass ().getPackage ().getName () + ".config",
                getClass ().getPackage ().getName () + ".utility"
        ));
    }

    @Override
    public String getName() {
        return NAME;
    }
}

